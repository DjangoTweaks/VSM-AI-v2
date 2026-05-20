import torch
import torchaudio
from transformers import Wav2Vec2FeatureExtractor, WavLMForXVector

device = "cuda" if torch.cuda.is_available() else "cpu"
model_id = "microsoft/wavlm-base-plus-sv"

print(f"Loading {model_id} on {device}")

feature_extractor = Wav2Vec2FeatureExtractor.from_pretrained(model_id)
model = WavLMForXVector.from_pretrained(model_id,use_safetensors=True).to(device)
model.eval()

def get_single_speechbrain_embedding(audio_path: str):
    try:
        signal, fs = torchaudio.load(audio_path)
        if fs != 16000:
            resampler = torchaudio.transforms.Resample(fs, 16000)
            signal = resampler(signal)

        if signal.shape[0] > 1:
            signal = torch.mean(signal, dim=0, keepdim=True)

        
        if signal.numel() == 0 or signal.shape[1] < 400:
            print("VAD removed too much audio, using original signal.")
            signal, fs = torchaudio.load(audio_path)
            if fs != 16000:
                resampler = torchaudio.transforms.Resample(fs, 16000)
                signal = resampler(signal)
            if signal.shape[0] > 1:
                signal = torch.mean(signal, dim=0, keepdim=True)

        inputs = feature_extractor(
            signal.squeeze().numpy(), 
            sampling_rate=16000, 
            return_tensors="pt"
        ).to(device)

        with torch.no_grad():
            outputs = model(**inputs)
            raw_embeddings = outputs.embeddings
            norm_embeddings = torch.nn.functional.normalize(raw_embeddings, p=2, dim=1)
            
            return norm_embeddings.cpu().numpy().flatten().tolist()

    except Exception as e:
        print(f"Embedding generation failed: {e}")
        return None
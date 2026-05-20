# import os
# import soundfile as sf
# from pyannote.audio import Pipeline
# import torch
# import app.settings as settings

# def save_customer_voice(audio_path: str) -> bool:
#     """
#     Diarizes audio, extracts the second longest segment, and saves it
#     as a mono WAV file with the original sample rate.
#     """
#     try:
#         pipeline = Pipeline.from_pretrained(
#             "pyannote/speaker-diarization-3.1",
#             use_auth_token=settings.HUGGING_FACE
#         )

#         if torch.cuda.is_available():
#             pipeline.to(torch.device("cuda"))
        
#         diarization = pipeline(audio_path)
        
#         segments = sorted([s for s, _, _ in diarization.itertracks(yield_label=True)],
#                           key=lambda s: s.duration, reverse=True)

#         if len(segments) < 2:
#             print("Error: Not enough segments to identify a 'customer' voice.")
#             return False

#         second_longest_segment = segments[1]
        
#         # Load audio data and sample rate in one line
#         audio_data, original_sample_rate = sf.read(audio_path)

#         # Slice the segment directly from the audio data
#         start_sample = int(second_longest_segment.start * original_sample_rate)
#         end_sample = int(second_longest_segment.end * original_sample_rate)
#         extracted_segment = audio_data[start_sample:end_sample]
        
#         # Save the mono audio segment with the original sample rate
#         sf.write("customer.wav", extracted_segment, original_sample_rate)
        
#         return True

#     except Exception as e:
#         print(f"An error occurred: {e}")
#         return False
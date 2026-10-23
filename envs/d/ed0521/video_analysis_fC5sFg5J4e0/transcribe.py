import json
from faster_whisper import WhisperModel
model = WhisperModel('small', device='cpu', compute_type='int8')
segments, info = model.transcribe('video_analysis_fC5sFg5J4e0/audio.m4a', language='zh', beam_size=5, vad_filter=True, condition_on_previous_text=True)
out=[]
for s in segments:
    out.append({'start': round(s.start,2), 'end': round(s.end,2), 'text': s.text.strip()})
json.dump({'language': info.language, 'language_probability': info.language_probability, 'segments': out}, open('video_analysis_fC5sFg5J4e0/transcript.json','w'), ensure_ascii=False, indent=2)
print(json.dumps({'language':info.language,'probability':info.language_probability,'segments':len(out)}, ensure_ascii=False))

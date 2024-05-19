from django.shortcuts import render
import requests

def chatbot_view(request):
    if request.method == 'POST':
        user_input = request.POST.get('user_input')
        api_url = 'http://127.0.0.1:3000/send'
        payload = {'message': user_input}
        response = requests.post(api_url, json=payload)

        if response.status_code == 200:
            bot_response = response.text
        else:
            bot_response = 'An error occurred during chatbot processing.'

        return render(request, 'ollama_chat.html', {
            'user_input': user_input,
            'bot_response': bot_response,
        })

    return render(request, 'ollama_chat.html')

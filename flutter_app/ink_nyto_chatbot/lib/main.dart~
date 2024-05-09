import 'dart:convert';

import 'package:flutter/material.dart';

import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Ink Nyto Bot',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: ChatScreen(),
    );
  }
}

class ChatScreen extends StatefulWidget {
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _textController = TextEditingController();
  final List<String> _messages = [];

  Future<void> _sendMessage(String message) async {
    _messages.add('User: $message');
    setState(() {});

    try {
      final request =
          http.Request('POST', Uri.parse('http://127.0.0.1:3000/send'));
      request.headers['Content-Type'] = 'application/json';
      request.body = jsonEncode({'message': message});
      final response = await request.send();

      if (response.statusCode == 200) {
        final stream = response.stream.transform(utf8.decoder);
        _messages.add('Chatbot: ');
        await for (final data in stream) {
          _messages.add(data);
          setState(() {});
        }
      } else {
        _messages.add('An error occurred during chatbot processing.');
        setState(() {});
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Ink Nyto Bot'),
      ),
      body: Column(
        children: [
          Expanded(
            child: Wrap(
              children: _messages
                  .map(
                    (message) => Text(
                      message,
                      style: TextStyle(fontSize: 16),
                    ),
                  )
                  .toList(),
            ),
          ),
          Row(
            children: [
              Expanded(
                child: TextField(
                  controller: _textController,
                  decoration: InputDecoration(
                    hintText: 'It was a dark and stormy night...',
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: () {
                  final message = _textController.text.trim();
                  if (message.isNotEmpty) {
                    _textController.clear();
                    _sendMessage(message);
                  }
                },
                child: Text('Send'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

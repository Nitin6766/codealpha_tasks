import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function FlashcardApp() {
  const [flashcards, setFlashcards] = useState([
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'What is 2 + 2?', answer: '4' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
    setIsEditing(false);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
    setIsEditing(false);
  };

  const addCard = () => {
    if (newCard.question && newCard.answer) {
      setFlashcards([...flashcards, newCard]);
      setNewCard({ question: '', answer: '' });
    }
  };

  const deleteCard = () => {
    const updated = flashcards.filter((_, index) => index !== currentIndex);
    setFlashcards(updated);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  const updateCard = () => {
    const updated = [...flashcards];
    updated[currentIndex] = newCard;
    setFlashcards(updated);
    setIsEditing(false);
  };

  const currentCard = flashcards[currentIndex];

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Card className="text-center">
        <CardContent className="p-6">
          {isEditing ? (
            <div className="space-y-2">
              <Textarea
                placeholder="Question"
                value={newCard.question}
                onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
              />
              <Textarea
                placeholder="Answer"
                value={newCard.answer}
                onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
              />
              <Button onClick={updateCard}>Save</Button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold">{currentCard.question}</h2>
              {showAnswer && <p className="mt-4 text-lg">{currentCard.answer}</p>}
              <Button className="mt-4" onClick={() => setShowAnswer(!showAnswer)}>
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-4">
        <Button onClick={prevCard}>Previous</Button>
        <Button onClick={() => { setIsEditing(true); setNewCard(currentCard); }}>Edit</Button>
        <Button onClick={deleteCard}>Delete</Button>
        <Button onClick={nextCard}>Next</Button>
      </div>

      <div className="mt-6 space-y-2">
        <h3 className="text-lg font-bold">Add New Flashcard</h3>
        <Input
          placeholder="Question"
          value={newCard.question}
          onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
        />
        <Input
          placeholder="Answer"
          value={newCard.answer}
          onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
        />
        <Button onClick={addCard}>Add Flashcard</Button>
      </div>
    </div>
  );
}

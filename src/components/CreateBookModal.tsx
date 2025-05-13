import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookPostCreateDto } from '@/types/api';

interface CreateBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (newBook: BookPostCreateDto) => void;
}

const CreateBookModal: React.FC<CreateBookModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState<BookPostCreateDto>({
        title: '',
        genre: '',
        isbn: '',
        language: '',
        availableFrom: '',
        availableTo: '',
        borrowPrice: 0,
        coverImage: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, coverImage: files?.[0] || null });
        } else if (type === 'number') {
            setFormData({ ...formData, [name]: parseFloat(value) || 0 });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCreate(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Genre</Label>
                            <Input
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>ISBN</Label>
                            <Input
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Language</Label>
                            <Input
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Available From</Label>
                            <Input
                                type="date"
                                name="availableFrom"
                                value={formData.availableFrom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Available To</Label>
                            <Input
                                type="date"
                                name="availableTo"
                                value={formData.availableTo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label>Borrow Price</Label>
                            <Input
                                type="number"
                                name="borrowPrice"
                                value={formData.borrowPrice}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <Label>Cover Image</Label>
                            <Input
                                type="file"
                                name="coverImage"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBookModal;
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOwnerBookUpdateDto } from '@/types/api';

interface EditBookModalProps {
    book: BookOwnerBookUpdateDto;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedBook: BookOwnerBookUpdateDto) => void;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ book, isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<BookOwnerBookUpdateDto>({ ...book });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Book</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Title</label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Genre</label>
                            <Input
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">ISBN</label>
                            <Input
                                name="isbn"
                                value={formData.isbn}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditBookModal;
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';

export function CodeForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Create with Code</CardTitle>
                <CardDescription>
                    Paste or write your model creation script below. We support Python scripts using popular libraries like Scikit-learn, TensorFlow, or PyTorch.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea 
                    placeholder="import sklearn..." 
                    className="min-h-[400px] font-code text-sm" 
                />
                <div className="flex justify-end">
                    <Button>
                        <UploadCloud className="mr-2 h-4 w-4" />
                        Register Model
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

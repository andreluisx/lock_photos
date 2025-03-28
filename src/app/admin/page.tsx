"use client"
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Eye, Trash2, Edit } from 'lucide-react';
import Image from 'next/image';

// Simulated Prisma client (you'd replace this with actual Prisma client setup)
const prisma = {
  post: {
    findMany: async () => {
      // This would be replaced with actual Prisma query
      return [
        {
          id: 1,
          photoPath: '/example-photo.jpg',
          forPremium: true,
          description: 'Beautiful sunset over mountains',
          likes: 256,
          createdAt: new Date(),
          categories: [
            { category: { name: 'Landscape' } },
            { category: { name: 'Nature' } }
          ]
        },
        {
          id: 2,
          photoPath: '/another-photo.jpg',
          forPremium: false,
          description: 'Urban street photography',
          likes: 134,
          createdAt: new Date(),
          categories: [
            { category: { name: 'Urban' } },
            { category: { name: 'Street Photography' } }
          ]
        }
      ];
    },
    delete: async (id) => {
      console.log(`Deleting post with id ${id}`);
      // Actual delete logic would go here
    }
  }
};

const AdminPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await prisma.post.findMany();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleViewDetails = (post) => {
    setSelectedPost(post);
    setIsDetailsDialogOpen(true);
  };

  const handleDeletePost = async () => {
    if (selectedPost) {
      try {
        await prisma.post.delete(selectedPost.id);
        setPosts(posts.filter(post => post.id !== selectedPost.id));
        setIsDeleteDialogOpen(false);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className='flex flex-row justify-between'>
          <CardTitle className="text-gray-100">Posts Management</CardTitle>
          <button className='px-3 py-1 cursor-pointer bg-gray-700 border border-gray-600 rounded-md'>Adicionar</button>
        </CardHeader>
        <CardContent>
          <Table className="border-gray-700">
            <TableHeader>
              <TableRow className="hover:bg-gray-800">
                <TableHead className="text-gray-300">ID</TableHead>
                <TableHead className="text-gray-300">Description</TableHead>
                <TableHead className="text-gray-300">Likes</TableHead>
                <TableHead className="text-gray-300">Premium</TableHead>
                <TableHead className="text-gray-300">Categories</TableHead>
                <TableHead className="text-gray-300">Created At</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id} className="border-gray-700 hover:bg-gray-800">
                  <TableCell className="text-gray-200 font-medium">{post.id}</TableCell>
                  <TableCell className="text-gray-300">{post.description}</TableCell>
                  <TableCell className="text-gray-300">{post.likes}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={post.forPremium ? 'default' : 'secondary'} 
                      className={post.forPremium ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 hover:bg-gray-700'}
                    >
                      {post.forPremium ? 'Premium' : 'Public'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {post.categories.map((cat) => (
                      <Badge 
                        key={cat.category.name} 
                        variant="outline" 
                        className="mr-1 border-gray-600 text-gray-300 bg-gray-700"
                      >
                        {cat.category.name}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="text-gray-400">{post.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => handleViewDetails(post)}
                              className="text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-500 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-gray-200 border-gray-700">
                            View Details
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="destructive" 
                              size="icon"
                              onClick={() => {
                                setSelectedPost(post);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="hover:bg-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="bg-gray-800 text-gray-200 border-gray-700">
                            Delete Post
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Post Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[625px] bg-gray-800 border-gray-700 text-gray-200">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Post Details</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Image 
                  src={selectedPost?.photoPath} 
                  alt="Post" 
                  width={40}
                  height={40}
                  className="col-span-2 w-full h-fit object-cover rounded-lg border border-gray-700"
                />
                <div className="col-span-2 space-y-3">
                  <p><strong className="text-gray-300">ID:</strong> <span className="text-gray-200">{selectedPost.id}</span></p>
                  <p><strong className="text-gray-300">Description:</strong> <span className="text-gray-200">{selectedPost.description}</span></p>
                  <p><strong className="text-gray-300">Likes:</strong> <span className="text-gray-200">{selectedPost.likes}</span></p>
                  <p><strong className="text-gray-300">Premium:</strong> <span className="text-gray-200">{selectedPost.forPremium ? 'Yes' : 'No'}</span></p>
                  <p><strong className="text-gray-300">Created At:</strong> <span className="text-gray-200">{selectedPost.createdAt.toLocaleString()}</span></p>
                  <p>
                    <strong className="text-gray-300">Categories:</strong>{' '}
                    <span className="text-gray-200">
                      {selectedPost.categories.map(cat => cat.category.name).join(', ')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-100">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePost}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPostsPage;
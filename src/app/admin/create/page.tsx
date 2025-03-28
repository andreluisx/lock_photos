"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2, X } from 'lucide-react';

// Schema de validação
const formSchema = z.object({
  photoPath: z.string().url({ message: "Deve ser uma URL válida" }),
  description: z.string().min(10, {
    message: "Descrição deve ter pelo menos 10 caracteres",
  }),
  forPremium: z.boolean().default(false),
  categories: z.array(z.string()).min(1, {
    message: "Selecione pelo menos uma categoria",
  }),
  newCategory: z.string().optional(),
});

// Simulação do Prisma Client (substitua pelo seu)
const prisma = {
  post: {
    create: async (data) => {
      console.log("Creating post:", data);
      // Na implementação real, isso seria:
      // return await prisma.post.create({ data });
      return { ...data, id: Math.floor(Math.random() * 1000), likes: 0, createdAt: new Date() };
    },
  },
  category: {
    findMany: async () => {
      // Simulando categorias existentes
      return [
        { id: 1, name: "Landscape" },
        { id: 2, name: "Nature" },
        { id: 3, name: "Urban" },
        { id: 4, name: "Street Photography" },
      ];
    },
  },
};

const CreatePostForm = () => {
  const router = useRouter();
  const [availableCategories, setAvailableCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photoPath: "",
      description: "",
      forPremium: false,
      categories: [],
      newCategory: "",
    },
  });

  // Carregar categorias disponíveis
  React.useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const categories = await prisma.category.findMany();
        setAvailableCategories(categories);
      } catch (error) {
        console.error("Error loading categories:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as categorias",
          variant: "destructive",
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      // Preparar dados para criação
      const postData = {
        photoPath: values.photoPath,
        description: values.description,
        forPremium: values.forPremium,
        categories: {
          connect: values.categories.map(categoryId => ({ id: parseInt(categoryId) })),
        },
      };

      // Criar post via Prisma
      const createdPost = await prisma.post.create(postData);

      toast({
        title: "Sucesso!",
        description: "Post criado com sucesso.",
      });

      // Redirecionar ou limpar formulário
      form.reset();
      router.push("/admin"); // Ajuste conforme sua rota
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao criar o post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addCategory = () => {
    const newCat = form.getValues("newCategory");
    if (newCat && !availableCategories.some(c => c.name === newCat)) {
      setAvailableCategories([...availableCategories, { id: Date.now(), name: newCat }]);
      form.setValue("newCategory", "");
    }
  };

  const toggleCategory = (categoryId) => {
    const currentCategories = form.getValues("categories");
    const categoryIdStr = categoryId.toString();
    
    if (currentCategories.includes(categoryIdStr)) {
      form.setValue(
        "categories",
        currentCategories.filter(id => id !== categoryIdStr)
      );
    } else {
      form.setValue("categories", [...currentCategories, categoryIdStr]);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">Criar Novo Post</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Campo da URL da Imagem */}
              <FormField
                control={form.control}
                name="photoPath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">URL da Imagem</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-gray-700 border-gray-600 text-gray-200 focus:border-purple-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Campo de Descrição */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-gray-700 border-gray-600 text-gray-200 focus:border-purple-500"
                        placeholder="Descreva a imagem..."
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Switch para Premium */}
              <FormField
                control={form.control}
                name="forPremium"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-700 p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-gray-300">Conteúdo Premium</FormLabel>
                      <p className="text-gray-400 text-sm">
                        Marque se este post é exclusivo para assinantes premium
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-purple-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Seleção de Categorias */}
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Categorias</FormLabel>
                    {isLoadingCategories ? (
                      <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                    ) : (
                      <>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {availableCategories.map((category) => {
                            const isSelected = form.getValues("categories").includes(category.id.toString());
                            return (
                              <Badge
                                key={category.id}
                                variant={isSelected ? "default" : "outline"}
                                className={`cursor-pointer ${isSelected ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600 border-gray-600 text-gray-300'}`}
                                onClick={() => toggleCategory(category.id)}
                              >
                                {category.name}
                                {isSelected && <X className="ml-1 h-3 w-3" />}
                              </Badge>
                            );
                          })}
                        </div>
                        <FormMessage className="text-red-400" />
                      </>
                    )}
                  </FormItem>
                )}
              />

              {/* Adicionar Nova Categoria */}
              <div className="flex gap-2">
                <Input
                  className="bg-gray-700 border-gray-600 text-gray-200 focus:border-purple-500 flex-1"
                  placeholder="Nova categoria"
                  value={form.watch("newCategory")}
                  onChange={(e) => form.setValue("newCategory", e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="text-gray-200 bg-gray-700 cursor-pointer border-gray-600 hover:bg-gray-700"
                  onClick={addCategory}
                >
                  Adicionar
                </Button>
              </div>

              {/* Botão de Submissão */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando...
                    </>
                  ) : (
                    "Criar Post"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePostForm;
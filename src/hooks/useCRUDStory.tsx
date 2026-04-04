import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCRUDStory = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["stories"],

    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");

      return res.data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post("http://localhost:3000/stories", data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
        toast.success("Thêm truyện thành công");
    },
  });

  // xóa
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await axios.delete(`http://localhost:3000/stories/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
      toast.success("Xóa truyện thành công");
    },
  });

  // sửa
  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.put(
        `http://localhost:3000/stories/${data.id}`,
        data,
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["stories"],
      });
      toast.success("Cập nhật truyện thành công");
    },
  });

  return {
    list: data || [],
    add: addMutation.mutate,
    remove: deleteMutation.mutate,
    update: updateMutation.mutate,
  };
};

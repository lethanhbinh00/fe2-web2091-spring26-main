import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateStory = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();

    const Mutation = useMutation({
        mutationFn: async(data: any) =>{
            const res = await axios.put(`http://localhost:3000/stories/${data.id}`, data);
            return res.data;
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["stories"],
            });
            toast.success("Cập nhật thêm truyện thành công");
            nav("/stories");
        }
    });
    return { update: Mutation.mutate };
}
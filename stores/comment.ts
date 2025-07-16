interface CreateCommentData {
    message: string;
    userId: number;
}

export const useCommentStore = defineStore('comment', () => {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;

    const createComment = async (postId: number, commentData: CreateCommentData) => {
        const { fetchWithAuth } = useAuth();
        await fetchWithAuth(`${apiBase}/posts/${postId}/comments`, {
            method: 'POST',
            body: {
                "message": commentData.message,
                "userId": commentData.userId
            }
        })
    };

    const getComments = async (postId: string) => {
        console.log('>>>getComments: start.', postId);
        const { fetchWithAuth } = useAuth();

        const data = await fetchWithAuth(`${apiBase}/posts/${postId}/comments`, {
            method: 'GET'
        })

        return data;
    };

    const deleteComment = async(commentId: string) => {
        console.log('deleteComment')
        const { fetchWithAuth } = useAuth();
        await fetchWithAuth(`${apiBase}/comments/${commentId}`, {
            method: 'DELETE'
        })
    };
    

    return {
        createComment,
        getComments,
        deleteComment,
    };
});

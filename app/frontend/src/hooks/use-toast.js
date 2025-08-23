export function useToast() {
  return {
    toast: ({ title, description }) => {
      // Minimal placeholder toast using alert to avoid extra deps
      // Replace with your preferred toast library later
      console.info(`[Toast] ${title} - ${description}`);
    }
  };
}



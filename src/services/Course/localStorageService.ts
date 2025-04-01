export const getFromLocalStorage = (key: string) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  };
  
  export const saveToLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
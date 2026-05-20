export const validateReminder = (data: any): boolean => {
       if (!data || typeof data.title !== 'string') {
         return false;
       }
       
       if (data.title.trim().length < 3) {
         return false;
       }
  
      return true;
    };
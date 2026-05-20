export const validateReminder = (data: any): boolean => {
      return !!data && typeof data.title === 'string' && data.title.trim().length >= 3;
    };
import { validateReminder } from '../../src/lib/validation';
    
     describe('Reminder Validation', () => {
       it('fails if the title is missing or empty', () => {
         const invalidData = { title: '' };
         expect(validateReminder(invalidData)).toBe(false);
       });
    
       it('fails if the title is less than 3 characters', () => {
        const invalidData = { title: 'ab' };
        expect(validateReminder(invalidData)).toBe(false);
      });
   
      it('passes if the title is 3 or more characters', () => {
        const validData = { title: 'Buy groceries' };
        expect(validateReminder(validData)).toBe(true);
      });
    });
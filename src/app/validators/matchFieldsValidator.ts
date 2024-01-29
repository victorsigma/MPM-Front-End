import { FormGroup, ValidationErrors } from '@angular/forms';

const matchFieldsValidator = (field1: string, field2: string) => {
    return (formGroup: FormGroup): ValidationErrors | null => {
        const control1: any = formGroup.get(field1);
        const control2: any = formGroup.get(field2);

        if (control1 && control2 && control1.value !== control2.value) {
            control2.setErrors({ matchFields: true });
            return { matchFields: true };
        } else {
            control2.setErrors(null);
            return null;
        }
    };
}


export default matchFieldsValidator
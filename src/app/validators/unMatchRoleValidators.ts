import { AbstractControl, ValidationErrors } from '@angular/forms';

const unMatchFieldsValidator = (role: number) => {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (value == role) {
            return { unMatchRole: true };
        } else {
            // Si la validación es exitosa, establece los errores a null
            control.setErrors(null);
            return null;
        }
    };
}


export default unMatchFieldsValidator
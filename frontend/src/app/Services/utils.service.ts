import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private formBuilder: FormBuilder) {}

  createForm(...fields: { name: string; value: any; required: boolean }[]): FormGroup {
    const formConfig: Record<string, any> = {};

    fields.forEach((field) => {
      formConfig[field.name] = [field.value, field.required ? Validators.required : null];
    });

    return this.formBuilder.group(formConfig);
  }

  patchFormValues(form: FormGroup, values: Record<string, any>) {
    form.patchValue(values);
  }

}

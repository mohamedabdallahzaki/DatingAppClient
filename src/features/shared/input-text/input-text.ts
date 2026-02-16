import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  imports: [ReactiveFormsModule],
  templateUrl: './input-text.html',
  styleUrl: './input-text.css',
})
export class InputText implements ControlValueAccessor {
  private static nextUniqueId = 0;
  private readonly generatedId = `input-text-${InputText.nextUniqueId++}`;

  @Input() label: string = '';

  @Input() type: string = 'text';
  @Input() id = '';
  @Input() name = '';

  @Input() maxDate:string= ''

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this
  }

  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
   
  }
 
  get control(): FormControl {
    return this.ngControl.control as FormControl
  }

  get inputId(): string {
    if (this.id.trim()) return this.id.trim();

    const controlName = this.ngControl.name?.toString().trim();
    if (controlName) return `input-${controlName}`;

    const normalizedLabel = this.normalizeLabel(this.label);
    if (normalizedLabel) return `${normalizedLabel}-${this.generatedId}`;

    return this.generatedId;
  }

  get inputName(): string {
    if (this.name.trim()) return this.name.trim();

    const controlName = this.ngControl.name?.toString().trim();
    if (controlName) return controlName;

    const normalizedLabel = this.normalizeLabel(this.label);
    if (normalizedLabel) return normalizedLabel;

    return this.generatedId;
  }

  get errorMessage(): string {
    if (!this.control || !this.control.touched || !this.control.errors) {
      return '';
    }

    const errors = this.control.errors;

    if (errors['required']) return `${this.label} is required`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['minlength']) {
      return `${this.label} must be at least ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['maxlength']) {
      return `${this.label} must be at most ${errors['maxlength'].requiredLength} characters`;
    }
    if (errors['confirmPassword']) return `${this.label} does not match password`;

    return 'Invalid value';
  }

  get showInvalidState(): boolean {
    return !!this.control && this.control.invalid && (this.control.touched || this.control.dirty);
  }

  get showValidState(): boolean {
    return !!this.control && this.control.valid && (this.control.touched || this.control.dirty);
  }

  private normalizeLabel(value: string): string {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
}

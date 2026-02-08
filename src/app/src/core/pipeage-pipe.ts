import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeage',
})
export class PipeagePipe implements PipeTransform {
  transform(value: string): number {
    const today = new Date();
    const dob = new Date(value);

    let age: number = today.getFullYear() - dob.getFullYear();

    if (
      today.getMonth() < dob.getMonth() ||
      (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  }
}

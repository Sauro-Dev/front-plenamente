import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Room } from '../room';
import { RoomsService } from '../rooms.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-room',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css'],
})
export class AddRoomComponent {
  roomForm: FormGroup;

  constructor(private fb: FormBuilder, private roomsService: RoomsService) {
    this.roomForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      isTherapeutic: [false],
    });
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      const newRoom: Room = this.roomForm.value;
      this.roomsService.registerRoom(newRoom).subscribe(
        (room) => {
          console.log('Sala registrada', room);
        },
        (error) => {
          console.error('Error al registrar la sala', error);
        }
      );
    }
  }

  onCancel(): void {
    this.roomForm.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {UsersService} from "../users.service"; [UsersService]

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ RouterLink, RouterLink, HttpClientModule, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users', error);
      }
    );
  }

}

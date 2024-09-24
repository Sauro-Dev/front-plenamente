import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {UsersService} from "../users.service";
import {FormsModule} from "@angular/forms"; [UsersService]

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, RouterLink, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = []; // Para almacenar los usuarios filtrados
  searchQuery: string = '';
  selectedRole: string = '';
  sortOrder: string = 'asc';
  itemsPerPage: number = 10;
  currentPage: number = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = [...this.users]; // Inicialmente todos los usuarios son visibles
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }

  // Función de búsqueda
  onSearch(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.paginate();
  }

  // Función de filtrado
  onFilter(): void {
    if (this.selectedRole) {
      this.filteredUsers = this.users.filter(user => user.role === this.selectedRole);
    } else {
      this.filteredUsers = [...this.users]; // Si no se selecciona ningún rol, mostrar todos
    }
    this.paginate();
  }

  // Función de ordenación
  onSort(): void {
    this.filteredUsers.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (this.sortOrder === 'asc') {
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      } else {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }
    });
    this.paginate();
  }

  // Función de cambio de número de ítems por página
  onItemsPerPageChange(): void {
    this.paginate();
  }

  // Paginación
  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.filteredUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  // Funciones para cambiar de página
  goToPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  protected readonly Math = Math;
}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Material } from "../material";
import { StorageService } from "../storage.service";
import { FormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { CommonModule, NgForOf } from "@angular/common";

@Component({
  selector: 'app-storage',
  standalone: true,
  imports: [RouterLink, FormsModule, NgxPaginationModule, NgForOf, CommonModule],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css'
})
export class StorageComponent {
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  searchTerm: string = '';
  p: number = 1; // Página actual
  pageSize: number = 10; // Materiales por página
  paginatedMaterials: Material[] = [];

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    this.storageService.getMaterials().subscribe((materials: Material[]) => {
      this.materials = materials;
      this.filteredMaterials = materials;
      this.p = 1; // Asegurarse de que la página comience desde 1
      this.updatePaginatedMaterials();
    });
  }

  filterMaterials(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredMaterials = this.materials;
    } else {
      this.filteredMaterials = this.materials.filter((material) =>
        material.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        material.idMaterial.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        material.estado?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.updatePaginatedMaterials(); // Actualizar después de filtrar
  }

  updatePaginatedMaterials(): void {
    const startIndex = (this.p - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMaterials = this.filteredMaterials.slice(startIndex, endIndex);
  }

  pageChanged(page: number): void {
    console.log("Página cambiada a: ", page);  // Verifica en consola
    this.p = page;
    this.updatePaginatedMaterials();
  }

  getMaxPageNumber(): number {
    // Devuelve el número máximo de páginas en función del número de materiales filtrados y la cantidad por página
    return Math.ceil(this.filteredMaterials.length / this.pageSize);
  }
}

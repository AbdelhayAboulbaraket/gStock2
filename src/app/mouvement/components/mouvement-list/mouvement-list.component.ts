import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Mouvement } from '../../model/mouvement';
import { MouvementService } from '../../service/mouvement.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-mouvement-list',
  templateUrl: './mouvement-list.component.html',
  styleUrls: ['./mouvement-list.component.css'],
})
export class MouvementListComponent implements OnInit {
  mouvements: Mouvement[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'id',
    'produit',
    'type',
    'quantite',
    'emplacement',
    'prixAchat',
    'date',
  ];
  dataSource = new MatTableDataSource<Mouvement>(this.mouvements);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private mouvementService: MouvementService,
    private route: Router
  ) {}

  ngOnInit() {
    this.mouvementService.findAll().subscribe(
      (data) => {
        this.mouvements = data;
        this.dataSource = new MatTableDataSource<Mouvement>(this.mouvements);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Mouvement>(null);
      }
    );
  }
  goToMouvementItem(code: string) {
    this.route.navigate(['/mouvement/' + code]);
  }
}

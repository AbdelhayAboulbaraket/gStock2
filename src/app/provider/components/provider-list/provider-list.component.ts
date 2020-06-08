import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProviderService } from '../../service/provider.service';
import { Provider } from '../../model/provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css'],
})
export class ProviderListComponent implements OnInit {
  providers: Provider[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'identifiant',
    'nom',
    'adresse',
    'telephone',
    'actions',
  ];
  dataSource = new MatTableDataSource<Provider>(this.providers);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private providerService: ProviderService,
    private route: Router
  ) {}
  deleteProvider(id: string) {
    this.providerService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.providerService.findAll().subscribe(
          (data) => {
            this.providers = data;
            this.dataSource = new MatTableDataSource<Provider>(this.providers);
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Provider>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.providerService.findAll().subscribe(
      (data) => {
        this.providers = data;
        this.dataSource = new MatTableDataSource<Provider>(this.providers);
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Provider>(null);
      }
    );
  }
  goToProviderItem(code: string) {
    this.route.navigate(['/provider/' + code]);
  }
}

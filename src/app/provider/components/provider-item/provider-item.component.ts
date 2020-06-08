import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProviderService } from '../../service/provider.service';
import { Provider } from '../../model/provider';

@Component({
  selector: 'app-provider-item',
  templateUrl: './provider-item.component.html',
  styleUrls: ['./provider-item.component.css'],
})
export class ProviderItemComponent implements OnInit {
  codeId: string;
  providerForm: FormGroup;
  provider: Provider;
  get nom() {
    return this.providerForm.get('nom');
  }

  get adresse() {
    return this.providerForm.get('adresse');
  }

  get telephone() {
    return this.providerForm.get('telephone');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService
  ) {
    this.provider = new Provider();
  }
  ngOnInit(): void {
    this.providerForm = new FormGroup({
      nom: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.nullValidator),
      telephone: new FormControl('', Validators.nullValidator),
    });
    this.codeId = this.route.snapshot.params['id'];
    console.log(this.codeId);
    this.providerService.findProvider(this.codeId).subscribe(
      (data) => {
        this.provider = data[0];
        this.nom.setValue(this.provider.nom);
        this.adresse.setValue(this.provider.adresse);
        this.telephone.setValue(this.provider.telephone);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.provider = this.providerForm.value;
    this.providerService
      .update(this.codeId, this.provider)
      .subscribe((result) => this.gotoProviderList());
  }

  gotoProviderList() {
    this.router.navigate(['/providers']);
  }

  reset() {
    this.providerForm.reset();
  }
}

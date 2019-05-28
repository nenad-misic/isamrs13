import {Component, Inject, Input, OnInit} from '@angular/core';
import {BranchOffice, RACService, RPriceList, RPriceListItem} from '../shared/sdk/models';
import {RACServiceApi, RPriceListApi, RPriceListItemApi} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-rac-branch-office-section',
  templateUrl: './rac-branch-office-section.component.html',
  styleUrls: ['./rac-branch-office-section.component.scss']
})
export class RacBranchOfficeSectionComponent implements OnInit {

  @Input()
  racService: RACService;

  branchAddress: string;
  branches: BranchOffice[];
  constructor(private toastr: ToastrService,
              @Inject('baseURL') private baseURL,
              private racApi: RACServiceApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }


  ngOnInit() {
    this.racApi.findById(this.racService.id, {include: 'branchOffices'}).subscribe((rac: RACService) => {
      this.branches = rac.branchOffices;
    });
  }

  addBranchOfficeClicked() {
    this.racApi.createBranchOffices(this.racService.id, {address: this.branchAddress}).subscribe(
      (succ) => {
        this.toastr.success('Branch office successfully added', 'Success');
        this.racApi.findById(this.racService.id, {include: 'branchOffices'}).subscribe((rac: RACService) => {
          this.branches = rac.branchOffices;
        });
      },
      (err) => this.toastr.error(err.toString(), 'Error'));
  }

  deleteBranchClicked(branch: BranchOffice) {
    this.racApi.destroyByIdBranchOffices(this.racService.id, branch.id).subscribe(
      (succ) => {
        this.toastr.success('Branch office successfully deleted', 'Success');
        this.racApi.findById(this.racService.id, {include: 'branchOffices'}).subscribe((rac: RACService) => {
          this.branches = rac.branchOffices;
        });
      },
      (err) => this.toastr.error(err.toString(), 'Error'));
  }

}

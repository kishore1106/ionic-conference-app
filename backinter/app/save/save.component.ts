import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QualityDataService } from '.././quality-table/qualitydata.service';
import { VelocityDataService } from '.././velocity-table/velocitydata.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'save',
    templateUrl: 'save/save.component.html'
})
export class SaveComponent implements OnInit {
    edit: boolean = true;
    @Input() updatedQualityData: any
    @Input() updatedVelocityData: any
    @Output() editRightsEvent = new EventEmitter();

    constructor(private qualityDataService: QualityDataService, private velocityDataService:VelocityDataService,private _toaster:ToastsManager) { }

    ngOnInit() { }

    saveChanges() {
        if (this.updatedQualityData != undefined) {
            // this.updatedQualityData.forEach(quality => {
            //     console.log('the changes are saved successfully', this.updatedQualityData);
            //     this.qualityDataService.updateQualityDetails(quality).subscribe((_details: Array<any>) => {
            //         // this.selectedList=[];
            //         console.log("updated", _details);
            //     });
            // });
            //this._toaster.success('Your Changes has been Saved!', 'Success!');
        }
        if (this.updatedVelocityData != undefined) {
            //  this.updatedVelocityData.forEach(velocity => {
            //     console.log('the changes are saved successfully', this.updatedVelocityData);
            //     this.velocityDataService.updateVelocityDetails(velocity).subscribe((_details: Array<any>) => {
            //         // this.selectedList=[];
            //         console.log("updated", _details);
            //     });
            // });
            // console.log('the changes are saved successfully', this.updatedVelocityData);
             //this._toaster.success('Your Changes has been Saved!', 'Success!');
        }
         this._toaster.success('Your Changes has been Saved!', 'Success!');
    }
    editToggle() {
        

        this.edit = false;
        console.log ( "edit Disablled",this.edit  );
        this.editRightsEvent.emit(this.edit);
        this._toaster.success('Your Changes has been Submitted!', 'Success!');
    }


}
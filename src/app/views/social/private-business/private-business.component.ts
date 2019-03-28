import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-private-business',
  templateUrl: './private-business.component.html',
  styleUrls: ['./private-business.component.scss']
})
export class PrivateBusinessComponent implements OnInit {

  modalSmall: any;
  constructor(private modalService: NgbModal) { }

  columns_deals = [
    { name: 'Name' },
    { name: 'OfferNumber' },
    { name: 'OfferLink' },
    { name: 'Option' }
  ];
  columns_events = [
    { name: 'Name' },
    { name: 'Link' },
    { name: 'Option' }
  ];
  columns_lists = [
    { name: 'Name' },
    { name: 'Role' },
    { name: 'PhoneNumber' }
  ];

  market_deals = [
    { name: 'Offer Name 1 ', offerNumber: '765756756', offerLink: 'www@www.com', option: 'delete' },
    { name: 'Offer Name 2 ', offerNumber: '76575675675', offerLink: 'www@www.com', option: 'delete' },
    { name: 'Offer Name 3 ', offerNumber: '4342342342', offerLink: 'www@www.com', option: 'delete' },
    { name: 'Offer Name 4 ', offerNumber: '2312312313', offerLink: 'www@www.com', option: 'delete' }
  ];
  business_events = [
    { name: 'Event Name 1 ', link: 'www@www.com', option: 'delete' },
    { name: 'Event Name 2 ', link: 'www@www.com', option: 'delete' },
    { name: 'Event Name 3 ', link: 'www@www.com', option: 'delete' },
    { name: 'Event Name 4 ', link: 'www@www.com', option: 'delete' }
  ];
  company_employee_lists = [
    { name: 'AAA', role: 'CTO', phoneNumber: '43244432' },
    { name: 'Extn', role: 'Manager', phoneNumber: '123123123' },
    { name: 'Ddfsg', role: 'Programmer', phoneNumber: '5435433553' },
    { name: 'Sala', role: 'Intern', phoneNumber: '54353453453' }
  ];
  ngOnInit() {
  }
  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        console.log(result);
      }, (reason) => {
        console.log('Err!', reason);
      });
  }
  // slideClick(rows) {
  //   let delete_button = rows.selected[0].option;
  //   alert(delete_button);
  // }
  // NameClick(rows) {
  //   let employee_name = rows.selected[0].name;
  //   alert(employee_name);
  // }
}

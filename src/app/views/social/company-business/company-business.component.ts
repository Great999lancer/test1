import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-business',
  templateUrl: './company-business.component.html',
  styleUrls: ['./company-business.component.scss']
})
export class CompanyBusinessComponent implements OnInit {

  constructor() { }

  // company_employees: any[];
  // business_offers: any[];
  // business_events: any[];

  columns_employees = [
    { name: 'Name' },
    { name: 'Role' },
    { name: 'PhoneNumber' }
  ];
  columns_events = [
    { name: 'Name' },
    { name: 'Link' }
  ];
  columns_offers = [
    { name: 'Name' },
    { name: 'OfferNumber' },
    { name: 'OfferLink' }
  ];
  rows_employees = [
    { name: 'Name' },
    { name: 'Role' },
    { name: 'PhoneNumber' }
  ];

  company_employees = [
    { name: 'AAA', role: 'CTO', phoneNumber: '43244432' },
    { name: 'Extn', role: 'Manager', phoneNumber: '123123123' },
    { name: 'Ddfsg', role: 'Programmer', phoneNumber: '5435433553' },
    { name: 'Sala', role: 'Intern', phoneNumber: '54353453453' }
  ];
  business_offers = [
    { name: 'Offer Name 1 ', offerNumber: '765756756', offerLink: 'www@www.com' },
    { name: 'Offer Name 2 ', offerNumber: '76575675675', offerLink: 'www@www.com' },
    { name: 'Offer Name 3 ', offerNumber: '4342342342', offerLink: 'www@www.com' },
    { name: 'Offer Name 4 ', offerNumber: '2312312313', offerLink: 'www@www.com' }
  ];
  business_events = [
    { name: 'Event Name 1 ', link: 'www@www.com' },
    { name: 'Event Name 2 ', link: 'www@www.com' },
    { name: 'Event Name 3 ', link: 'www@www.com' },
    { name: 'Event Name 4 ', link: 'www@www.com' }
  ];

  ngOnInit() {
  }

}

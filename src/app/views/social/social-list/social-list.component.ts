import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataLayerService } from 'src/app/shared/services/data-layer.service';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { IMultiSelectOption, IMultiSelectTexts, IMultiSelectSettings } from 'angular-2-dropdown-multiselect';
import { countryJSON } from '../../json/countryJSON';
import { UrlJSON } from '../../json/urlJSON';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { $ } from 'protractor';

@Component({
  selector: 'app-social-list',
  templateUrl: './social-list.component.html',
  styleUrls: ['./social-list.component.scss'],
  animations: [SharedAnimations]
})
export class SocialListComponent implements OnInit {

  viewMode: String;
  allSelected: boolean;
  page = 1;
  pageSize = 8;

  pages = 1;
  current = 1;
  index = 0;
  last_index = 0;
  index_arr = [];
  role = '0';
  users: any[] = [];
  filteredUsers: any[] = [];
  businesses: any[];
  searchUserData = { country: 'All', fromDate: '', toDate: '' };
  searchData = { country: 'All', fromDate: '', toDate: '' };

  countryArr = countryJSON;
  tabs: any[];
  countryModel: number[];
  countryOptions: IMultiSelectOption[];
  countryWarn = false;

  countrySettings: IMultiSelectSettings = {
    showUncheckAll: true,
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block  btn-after',
    dynamicTitleMaxItems: 1,
    displayAllSelectedText: true,
    containerClasses: 'custom-dropdown',
    closeOnSelect: false
  };
  // Text configuration
  countryTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Clear',
    checked: 'item selected',
    checkedPlural: 'selected',
    searchPlaceholder: 'Find',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'All',
    allSelected: 'All selected',
  };

  @ViewChild('confirmModal_view') confirmModal_view: ElementRef;
  currentId;

  constructor(private userService: UserService, public router: Router, private modalService: NgbModal) { }

  ngOnInit() {

    this.businesses = [
      { id: '11121321321312', companyName: 'ShotGun Company', picture: 'http://localhost:8080/api/displayAvatarFromFS/1.png', userName: 'Alex Kozlov', country: 'Russian Federation', city: '', email: '', category: 'Hi-Tech' },
      { id: '21121321321312', companyName: 'Walden Company', picture: 'http://localhost:8080/api/displayAvatarFromFS/2.png', userName: 'Evan Kevi', country: 'Unit States', city: '', email: '', category: 'Cars' },
      { id: '31121321321312', companyName: 'Company Realtime', picture: 'http://localhost:8080/api/displayAvatarFromFS/3.png', userName: 'Davi Ellison', country: 'Russian Federation', city: '', email: '', category: 'Electrons' },
      { id: '41121321321312', companyName: 'Arrow Company', picture: 'http://localhost:8080/api/displayAvatarFromFS/4.png', userName: 'Seray Stewart', country: 'Belarus', city: '', email: '', category: 'Hi-Tech' },
      { id: '51121321321312', companyName: 'Tele Company', picture: 'http://localhost:8080/api/displayAvatarFromFS/3.png', userName: 'Roman Lyman', country: 'Canada', city: '', email: '', category: 'Baby' },
      { id: '61121321321312', companyName: 'NoBull Company', picture: 'http://localhost:8080/api/displayAvatarFromFS/1.png', userName: 'Kirr Lyman', country: 'Russian Federation', city: '', email: '', category: 'Agriculture' },
      { id: '71121321321312', companyName: 'Company Haven', picture: 'http://localhost:8080/api/displayAvatarFromFS/3.png', userName: 'Kill Ellison', country: 'Canada', city: '', email: '', category: 'Books' },
      { id: '81121321321312', companyName: 'Digital', picture: 'http://localhost:8080/api/displayAvatarFromFS/2.png', userName: 'Qere Wilkins', country: 'Israel', city: '', email: '', category: 'Hi-Tech' },
      { id: '91121321321312', companyName: 'Digital Express', picture: 'http://localhost:8080/api/displayAvatarFromFS/1.png', userName: 'Lorl Tucker', country: 'Belarus', city: '', email: '', category: 'Electrons' },
      { id: '10121321321312', companyName: 'Pretty Digital', picture: 'http://localhost:8080/api/displayAvatarFromFS/4.png', userName: 'Urom Paterson', country: 'Israel', city: '', email: '', category: 'Cars' },
      { id: '11121321321312', companyName: 'Loyal Digital', picture: 'http://localhost:8080/api/displayAvatarFromFS/3.png', userName: 'John Stewart', country: 'Israel', city: '', email: '', category: 'Baby' },
      { id: '12121321999999', companyName: 'Metro Digital', picture: 'http://localhost:8080/api/displayAvatarFromFS/2.png', userName: 'Kevin Stewart', country: 'Israel', city: '', email: '', category: 'Hi-Tech' },
      { id: '12121321999999', companyName: 'White Digital', picture: 'http://localhost:8080/api/displayAvatarFromFS/1.png', userName: 'Stephen Tucker', country: 'Israel', city: '', email: '', category: 'Electrons' },
      { id: '12121321999999', companyName: 'TopRank Digital', picture: 'http://localhost:8080/api/displayAvatarFromFS/2.png', userName: 'Kevin Wilkins', country: 'Israel', city: '', email: '', category: 'Agriculture' },
      { id: '12121321999999', companyName: 'BasicCamp Digital', picture: 'http://localhost:8080/api/displayAvatarFromFS/4.png', userName: 'Roman Paterson', country: 'Israel', city: '', email: '', category: 'Hi-Tech' },
      { id: '12121321999999', companyName: 'Tourism', picture: 'http://localhost:8080/api/displayAvatarFromFS/3.png', userName: 'Kevin Wilkins', country: 'Israel', city: '', email: '', category: 'Books' },
      { id: '12121321999999', companyName: 'Driver Cars', picture: 'http://localhost:8080/api/displayAvatarFromFS/2.png', userName: 'Stephen Paterson', country: 'Israel', city: '', email: '', category: 'Baby' }
    ];
    this.viewMode = 'list';
    localStorage.setItem('itemPage', '1');
    // this.fetchUsers();
    this.countryOptions = this.countryArr;
    this.role = localStorage.getItem('role');
    document.getElementsByClassName('nav-link active_url')[0].className = 'nav-link active_url';
    document.getElementsByClassName('nav-link active_url')[1].className = 'nav-link active_url active';
    document.getElementsByClassName('nav-link active_url')[2].className = 'nav-link active_url';
  }

  fetchUsers() {
    this.searchData.country = this.searchUserData.country;
    this.searchData.fromDate = this.searchUserData.fromDate;
    this.searchData.toDate = this.searchUserData.toDate;
    if (this.searchUserData.country === '') {
      this.searchData.country = 'All';
    }
    if (this.searchUserData.fromDate == null || this.searchUserData.fromDate === '') {
      this.searchData.fromDate = '1900-01-01';
    } else {
      const fromDateObj = this.searchUserData.fromDate;
      const from_month = fromDateObj['month'] < 9 ? '0' + fromDateObj['month'] : fromDateObj['month'];
      const from_day = fromDateObj['day'] < 9 ? '0' + fromDateObj['day'] : fromDateObj['day'];
      this.searchData.fromDate = fromDateObj['year'] + '-' + from_month + '-' + from_day;
      const toDateObj = this.searchUserData.toDate;
      const to_month = toDateObj['month'] < 9 ? '0' + toDateObj['month'] : toDateObj['month'];
      const to_day = toDateObj['day'] < 9 ? '0' + toDateObj['day'] : toDateObj['day'];
      this.searchData.toDate = toDateObj['year'] + '-' + to_month + '-' + to_day;
    }
    if (this.searchUserData.toDate === '' || this.searchUserData.toDate == null
      || this.searchUserData.toDate < this.searchUserData.fromDate) {
      this.searchData.toDate = '2100-01-01';
    }
    this.page = this.getCurrentPage() === null ? 1 : Number(this.getCurrentPage());
    this.userService.getUsers(this.page, this.searchData)
      .subscribe((val: any[]) => {
        const users = val['user'];
        this.pages = Number(val['pages']);
        this.current = Number(val['current']);
        this.index = Number(this.current) > 3 ? Number(this.current) - 2 : 1;
        this.last_index = this.current + 2;
        this.index_arr = [];
        if (this.current > 3) {
          for (let i = this.current - 1; i < (Number(this.current) + 2) && i <= this.pages; i++) {
            this.index_arr.push(i);
          }
        } else {
          for (let i = this.index; i < (Number(this.current) + 2) && i <= this.pages; i++) {
            this.index_arr.push(i);
          }
        }

        this.users = [...users];
        this.filteredUsers = users;

        for (let i = 0; i < this.filteredUsers.length; i++) {
          if (this.filteredUsers[i].picture === 'default.png') {
            this.filteredUsers[i].picture = '../../../../assets/images/avatar/default.png';
          } else {
            if (this.filteredUsers[i].extraBlob === '2') {
              this.filteredUsers[i].picture = UrlJSON.displayAvatarFromFSUrl + this.filteredUsers[i].picture;
            } else {
              this.filteredUsers[i].picture = UrlJSON.displayPictureUrl + this.filteredUsers[i].picture;
            }
          }
        }
      });
  }
  jsonToString(arr) {
    let return_val = '';
    for (let i = 0; i < arr.length; i++) {
      return_val += arr[i].name + ',';
    }
    return return_val;
  }
  getCurrentPage() {
    return localStorage.getItem('userPage');
  }

  saveCurrentPage(page) {
    localStorage.setItem('userPage', page);
  }

  gotoPage(page) {
    if (page < 1 || page > this.pages) {
      return;
    }
    this.page = page;
    this.saveCurrentPage(this.page);
    this.fetchUsers();
  }
  gotoPreviousPage() {
    if (Number(this.current) - 1 === 0) {
      return;
    } else {
      this.page = Number(this.current) - 1;
      this.saveCurrentPage(this.page);
      this.fetchUsers();
    }
  }
  gotoNextPage() {
    if (Number(this.current) + 1 > this.pages) {
      return;
    } else {
      this.page = Number(this.current) + 1;
      this.saveCurrentPage(this.page);
      this.fetchUsers();
    }
  }
  pageChange(event) {
    this.page = event;
    console.log(event);
  }

  onChangeCountry(event) {
    this.searchUserData.country = '';
    for (let i = 0; i < event.length; i++) {
      this.searchUserData.country += this.countryArr[event[i] - 1].name + ',';
    }
    this.filterData();
  }
  filterData() {
    this.saveCurrentPage('1');
    this.fetchUsers();
  }

  postDetial(id) {
    this.router.navigate([`/social/edit/${id}`]);
  }

  goToCompany(id) {
    this.router.navigate([`/social/business/${id}`]);
  }

}


// columns = [
//   { name: 'Thumbnail' },
//   { name: 'CompanyName' },
//   { name: 'Category' },
//   { name: 'Country' }
// ];
// allBusiness = [
//   { thumbnail: 'Picture1', companyName: 'ABB', category: 'Hi-Tech', country: 'Russia' },
//   { thumbnail: 'Picture2', companyName: 'BBB', category: 'Agriculture', country: 'dfsaf' },
//   { thumbnail: 'Picture3', companyName: 'asfdasfadsfasd', category: 'gfdsg', country: 'gfds' },
//   { thumbnail: 'Picture4', companyName: 'dsfasd', category: 'Cars', country: 'dfsaf' },
//   { thumbnail: 'Picture5', companyName: 'ABB', category: 'Hi-Tech', country: 'Russia' },
//   { thumbnail: 'Picture6', companyName: 'BBB', category: 'Agriculture', country: 'dfsaf' },
//   { thumbnail: 'Picture7', companyName: 'asfdasfadsfasd', category: 'gfdsg', country: 'gfds' },
//   { thumbnail: 'Picture8', companyName: 'dsfasd', category: 'Cars', country: 'dfsaf' },
//   { thumbnail: 'Picture9', companyName: 'ABB', category: 'Hi-Tech', country: 'Russia' },
//   { thumbnail: 'Picture10', companyName: 'BBB', category: 'Agriculture', country: 'dfsaf' },
//   { thumbnail: 'Picture11', companyName: 'asfdasfadsfasd', category: 'gfdsg', country: 'gfds' },
//   { thumbnail: 'Picture12', companyName: 'dsfasd', category: 'Cars', country: 'dfsaf' },
//   { thumbnail: 'Picture13', companyName: 'ABB', category: 'Hi-Tech', country: 'Russia' },
//   { thumbnail: 'Picture14', companyName: 'BBB', category: 'Agriculture', country: 'dfsaf' },
//   { thumbnail: 'Picture15', companyName: 'asfdasfadsfasd', category: 'gfdsg', country: 'gfds' },
//   { thumbnail: 'Picture16', companyName: 'dsfasd', category: 'Cars', country: 'dfsaf' },
//   { thumbnail: 'Picture17', companyName: 'ABB', category: 'Hi-Tech', country: 'Russia' },
//   { thumbnail: 'Picture18', companyName: 'BBB', category: 'dasda', country: 'dfsaf' },
//   { thumbnail: 'Picture19', companyName: 'asfdasfadsfasd', category: 'gfdsg', country: 'gfds' },
//   { thumbnail: 'Picture20', companyName: 'dsfasd', category: 'gfdsggf', country: 'dfsaf' },
//   { thumbnail: 'Picture21', companyName: 'ABB', category: 'Hi-Tech', country: 'Russia' },
//   { thumbnail: 'Picture22', companyName: 'BBB', category: 'dasda', country: 'dfsaf' },
//   { thumbnail: 'Picture23', companyName: 'asfdasfadsfasd', category: 'gfdsg', country: 'gfds' },
//   { thumbnail: 'Picture24', companyName: 'dsfasd', category: 'gfdsggf', country: 'dfsaf' }
// ];

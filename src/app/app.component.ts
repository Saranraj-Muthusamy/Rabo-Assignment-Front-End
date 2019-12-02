import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Rabo-Assignment-Front-End';
  csvContent: String;
  displayedColumns: string[] = ['firstName', 'surName', 'issueCount', 'dob'];

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.csvContent = fileReader.result as string;
        var lines = this.csvContent.trim().split("\n");
        var results = [];
        var headers = ['firstName', 'surName', 'issueCount', 'dob'];

        for (var i = 1; i < lines.length; i++) {
          let obj = {};
          var currentline = lines[i].split(",");
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
          results.push(obj);
        }
        
        for (var i = 0; i < results.length; i++) {
          ELEMENT_DATA.push({
            firstName: results[i].firstName,
            surName: results[i].surName,
            issueCount: results[i].issueCount,
            dob: results[i].dob
          });
        }

        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.sort = this.sort;
      }
      fileReader.readAsText(fileToRead, "UTF-8");
    }
  }

}


export interface RaboIssueElement {
  firstName: string;
  surName: string;
  issueCount: number;
  dob: string;
}

const ELEMENT_DATA: Array<RaboIssueElement> = [];
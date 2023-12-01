import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgControl, ReactiveFormsModule, NgForm, FormsModule } from '@angular/forms';
import { PouchdbService } from 'src/app/pouchdb.service';
import { TreeTableModule } from 'primeng/treetable';
import {Tree} from 'primeng/tree';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-struktura-form',
  templateUrl: './struktura-form.component.html',
  styleUrls: ['./struktura-form.component.scss'],
  providers: [TreeDragDropService],
 

})

export class StrukturaFormComponent implements OnInit {
  sqlquery1: any[];
  dataTree: TreeNode[];
  jsonData: any[];

  constructor(private fb: FormBuilder, private db: PouchdbService, ) { }


  ngOnInit(): void {
this.dataTree = [
          {
              "key": "0dsdad",
              "label": "Documents",
              "data": "Documents Folder",
              "icon": "pi pi-fw pi-inbox",
              "children": [{
                  "key": "0-0",
                  "label": "Work",
                  "data": "Work Folder",
                  "icon": "pi pi-fw pi-cog",
                  "children": [{ "key": "0-0-0", "label": "Expenses.doc", "icon": "pi pi-fw pi-file", "data": "Expenses Document" }, { "key": "0-0-1", "label": "Resume.doc", "icon": "pi pi-fw pi-file", "data": "Resume Document" }]
              },
              {
                  "key": "0-1",
                  "label": "Home",
                  "data": "Home Folder",
                  "icon": "pi pi-fw pi-home",
                  "children": [{ "key": "0-1-0", "label": "Invoices.txt", "icon": "pi pi-fw pi-file", "data": "Invoices for this month" }]
              }]
          },
          {
              "key": "1",
              "label": "Events",
              "data": "Events Folder",
              "icon": "pi pi-fw pi-calendar",
              "children": [
                  { "key": "1-0", "label": "Meeting", "icon": "pi pi-fw pi-calendar-plus", "data": "Meeting" },
                  { "key": "1-1", "label": "Product Launch", "icon": "pi pi-fw pi-calendar-plus", "data": "Product Launch" },
                  { "key": "1-2", "label": "Report Review", "icon": "pi pi-fw pi-calendar-plus", "data": "Report Review" }]
          },
          {
              "key": "2",
              "label": "Movies",
              "data": "Movies Folder",
              "icon": "pi pi-fw pi-star",
              "children": [{
                  "key": "2-0",
                  "icon": "pi pi-fw pi-star",
                  "label": "Al Pacino",
                  "data": "Pacino Movies",
                  "children": [{ "key": "2-0-0", "label": "Scarface", "icon": "pi pi-fw pi-video", "data": "Scarface Movie" }, { "key": "2-0-1", "label": "Serpico", "icon": "pi pi-fw pi-video", "data": "Serpico Movie" }]
              },
              {
                  "key": "2-1",
                  "label": "Robert De Niro",
                  "icon": "pi pi-fw pi-star",
                  "data": "De Niro Movies",
                  "children": [{ "key": "2-1-0", "label": "Goodfellas", "icon": "pi pi-fw pi-video", "data": "Goodfellas Movie" }, { "key": "2-1-1", "label": "Untouchables", "icon": "pi pi-fw pi-video", "data": "Untouchables Movie" }]
              }]
          }
      ]
  

  /*
this.policzLiscie();

    this.sqlquery1 = [
      { "id": 456, "parentid": 123, "name": "Dogs" },
      { "id": 214, "parentid": 456, "name": "Labradors" },
      { "id": 123, "parentid": 0, "name": "Mammals" },
      { "id": 810, "parentid": 456, "name": "Pugs" },
      { "id": 919, "parentid": 456, "name": "Terriers" },
      { "id": 919, "parentid": 810, "name": "810 Terriers" }
    ]

    //this.dataTree=this.makeTree(this.sqlquery1);
    this.dataTree=this.list_to_tree(this.sqlquery1);
    

    console.log(this.dataTree);
*/

  }

 
  onNodeDrop(event) {
    console.log("Przeniesiono węzeł", event);

    // Możesz tutaj obsłużyć logikę aktualizacji struktury drzewa
    // Na przykład, zaktualizuj swoje dane drzewa lub zapisz zmiany w bazie danych
}

 czyLeaf(node: any){
  console.log("działa czyLeaf")
  try {
    var dl=0
    dl=node.children.length
    if(dl > 0){
      node.liczba_dzieci=dl;
    return true;
    }
  } catch (error) {
    return false;
  }
  return false
}

editNode(node:any) {
  node.isEditing = true;
} 

stopEditing(node:any) {
  node.isEditing = false;
  // Tutaj możesz również zapisywać zmiany w bazie danych
}

  policzLiscie(){
    function countLeaves(node, allNodes) {
      // Sprawdzamy, czy węzeł ma dzieci.
      if (node.children.length === 0) {
        // Jeśli węzeł nie ma dzieci, to jest liściem.
        return 1;
      } else {
        // Jeśli węzeł ma dzieci, zliczamy liście rekurencyjnie dla każdego dziecka.
        let leafCount = 0;
        node.children.forEach(childId => {
          const childNode = allNodes.find(n => n.id === childId);
          leafCount += countLeaves(childNode, allNodes);
        });
        // Dodajemy liczbę liści jako właściwość węzła
        node.leafCount = leafCount;
        return leafCount;
      }
    }
    
    // Funkcja do znajdowania korzenia drzewa (węzła bez parenta)
    function findRoot(allNodes) {
      return allNodes.find(node => node.parentId == null);
    }
    
    // Przykładowe drzewo
    const treeNodes = [
      { id: 1, parentId: null, children: [2, 3], leafCount: 0 },
      { id: 2, parentId: 1, children: [4], leafCount: 0 },
      { id: 3, parentId: 1, children: [], leafCount: 0 },
      { id: 4, parentId: 2, children: [], leafCount: 0 },
    ];
    
    // Znajdowanie korzenia drzewa
    const root = findRoot(treeNodes);
    
    // Zliczanie liści
    countLeaves(root, treeNodes);
    
    // Wypisanie wyników
    console.log(treeNodes);
  }

  

   list_to_tree(list) {
    var map = {}; 
    var node; 
    var roots = []; 
    var i;
    
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
      console.log("i" + i)
      console.log("Ustawienia" + list[i].id +"pid "+list[i].parentid )
      console.log("Ustawienia" + list[i].children)
    }
    
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      node.data=list[i];
      node.key=list[i].id
      if (node.parentid !== 123) {
        // if you have dangling branches check that map[node.parentId] exists
        console.log("pid "+node.parentid)
        try{
        list[map[node.parentid]].children.push(node);
        console.log("dodano child "+node.parentid)
        }catch{
          console.log("błąd podczas pid "+node.parentid)
        }
      } else {
        
        roots.push(node);
      }
    }
    //var json = roots.map(item => JSON.stringify(item))
      //  console.log("JSON "+json)
    return  <TreeNode[]>roots;
  }

  makeTree(q) {
    // (options) ->
    var id = "id";
    var pid = "parentid"
    var children = "children"

    var temp = {}
    var o = []


    // Create the tree
    for (var e of q) {
      console.log("q= "+q)
      console.log("Sprawdzam "+e.id)
      e[children] = []
      // Add the row to the index
      temp[e[id]] = e
      console.log("tmp "+temp)
      // This parent should be in the index
      if (temp[e[pid]]) {
        // This row is a child
        //# Add the child to the parent
        temp[e[pid]][children].push(e)
      }
      else
        // Add a root item
        o.push(e)
      return o
    }
    return o
  }


  /*
  queryTreeSort = (options) ->
  id = options.id or "id"
  pid = options.parentid or "parentid"
  ri  = [] // Root items
  rfi = {} // Rows from id
  cfi = {} // Children from id
  o = []
  // Setup Indexing
  for e, i in options.q
    rfi[e[id]] = i
    if not cfi[e[pid]]?
      cfi[e[pid]] = []
    cfi[e[pid]].push(options.q[i][id])
  // Find parents without rows
  for e in options.q when not rfi[e[pid]]?
    ri.push(e[id])
  
  // Create the correct order
  while ri.length
    thisid = ri.splice(0,1)
    o.push(options.q[rfi[thisid]])
  
    if cfi[thisid]?
      ri = cfi[thisid].concat(ri)
  return o
  
  */







  /*
_renderTree = (tree) ->
  html = "<ul>"
  for e in tree
    html += "<li>#{e.name}"
    if e.children?
      html += _renderTree(e.children)
    html += "</li>"
  html += "</ul>"
  return html

#  _____                           _      
# | ____|_  ____ _ _ __ ___  _ __ | | ___ 
# |  _| \ \/ / _` | '_ ` _ \| '_ \| |/ _ \
# | |___ >  < (_| | | | | | | |_) | |  __/
# |_____/_/\_\__,_|_| |_| |_| .__/|_|\___|
#                           |_|           


        
$('#sqlquery').html(JSON.stringify(sqlquery, true, 2))

sortedquery = _queryTreeSort({q:sqlquery})
$('#sortedquery').html(JSON.stringify(sortedquery, true, 2))

tree = _makeTree({q:sortedquery})
$('#tree').html(JSON.stringify(tree, true, 2))

htmllist = _renderTree(tree)
$('#htmllist').html(htmllist)

*/

}


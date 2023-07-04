using { managed, cuid } from '@sap/cds/common';
namespace de.quadrio.recap; 

entity Orders : managed, cuid {
  humanId: String;
  article: String;
}

entity Tickets : managed, cuid { 
  text : String;
  order: Association to one Orders;
  summary: String;
  responseSuggestion: String;
}
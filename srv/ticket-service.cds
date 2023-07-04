using { de.quadrio.recap as my } from '../db/schema';
service TicketService  { 
  entity Tickets as projection on my.Tickets;
  entity Orders as projection on my.Orders;
}
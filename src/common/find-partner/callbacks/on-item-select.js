export default function (partner) {
  this.selectedItem = partner;
  this.inputModel = partner.title;
  this.actions.selectItem(partner);
  this.onSelect({partner: partner});
  this.isShowItems = false;
}

export default function () {
  this.pressedDropdown ?
    this.pressedDropdown = false :
    (
      this.isShowItems = false,
      this.inputModel = this.selectedItem ? this.selectedItem.title: ''
    );
}

export default function (input) {
  input ?
    (this.selectedItem && this.selectedItem.title !== input || !this.selectedItem) &&
    (this.selectedItem = null, this.actions.change(input))
    :
    this.actions.change();
}

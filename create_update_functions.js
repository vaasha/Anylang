

function DownloadXML() {
  this.download = $(this).parents("form").find("input.file_name").val() + ".xml";
  this.href = "data:text/plain;charset=UTF-8,"  + encodeURIComponent("<?xml version='1.0' ?>"+create_xml($(this).parents("form")));
}

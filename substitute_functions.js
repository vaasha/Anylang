//Go through all types of words (nouns, verbs etc) and change text based on /doc/sentence/original/word/translation/STRUCTURE/basic_form to /doc/sentence/original/word/translation/STRUCTURE/text. 
//All changes are based purely on BASIC FROM
function substituteAllTypes(div, ppath="../../..", lang="none") {
//div is original xml without substitutions  
  
  var wordTypes = ["translation", "grammar", "noun", "adjective", "pronoun", "verb", "relations", "phrase"];
  
  var xmlDocToProcess =  $(div); //div containing the xml to be substituted
  
  $.each(wordTypes,function(i,wordType) {
    xmlDocToProcess.find(wordType).each(function(){ 
      
      var highlight = "";
      if (wordType == "verb") {
        highlight = $(this).children("basic_form").attr("conj");
      }
      
      if (wordType == "noun") {
        highlight = $(this).children("basic_form").attr("decl");
      }
      
      if (wordType == "phrase") {
        highlight = $(this).children("basic_form").attr("highlight");
      }
      console.log(highlight);
  
      var html = "";
      var path = ppath+lang+"/"+wordType+"/" + $(this).children("basic_form").html() + ".xml";
      console.log(path);
  
          $.ajax({
          context: this,
          type: "GET",
          url: path,
          cache: false,
          dataType: "xml",
          success: function(xml) {
            //Parse the givn XML
            var xmlDoc = $( xml );
  
            //pass it to the function which create appropriate form of the wordType        
            html = window[wordType](xmlDoc,lang, highlight); 
            $(this).children("text").html(html);
  
          },
          error: function(xmlHttpRequest, textStatus, errorThrown) {
            console.log("No File " + path + " of type " + wordType + " was found");
            console.log(textStatus);
            console.log(errorThrown);
          } 
  
        })
      })
  })
}



function noun(xmlDoc, lang="none", highlight = "none") {

  var nounXML = xmlDoc.children("noun");

  if (lang=="in") {
    /* Bahasa Indonesia */
    console.log("bahasa");
    return nounXML.children("original").html() + "-" + nounXML.children("translate").html(); 
  } else if (lang=="de") {

          /* German */
          /* Create a table with german noun with definite and indefinite articles and highligt the current form */
          
          table = $("<table>").addClass("verb"); 
          Original = nounXML.children("original").html();
          Translate = nounXML.children("translate").html();
          
          switch (nounXML.children("gender").html()) {
            case "masculine": Gender = "mužský rod"; break;
            case "feminine": Gender = "ženský rod"; break;
            case "neutral": Gender = "střední rod"; break;
            default: Gender = "žádný";
          }

          table.append($("<tr>").append($("<th>").attr("colspan",3).html(Original + " - " + Translate + " (" + Gender + ")")));
          table.append($("<tr>").append($("<th>").attr("colspan",3).html("Jednotné číslo")));
          table.append($("<tr>").append($("<th>").html("pád")).append($("<th>").html("neurčitý člen")).append($("<th>").html("určitý člen")));                                                               
            OriginalInd = nounXML.children("nominativ_singular_indefinite").children("original").html();
            //TranslateInd = nounXML.children("nominativ_singular_indefinite").children("translate").html();
            OriginalDef = nounXML.children("nominativ_singular_definite").children("original").html();
            //TranslateDef = nounXML.children("nominativ_singular_definite").children("translate").html();
          table.append($("<tr>").append($("<td>").html("nominativ")).append($("<td>").addClass(highlight == "nominativ_singular_indefinite" ? "active" : "").html(OriginalInd)).append($("<td>").addClass(highlight == "nominativ_singular_definite" ? "active" : "").html(OriginalDef)));
            OriginalInd = nounXML.children("accusativ_singular_indefinite").children("original").html();
            //TranslateInd = nounXML.children("accusativ_singular_indefinite").children("translate").html();
            OriginalDef = nounXML.children("accusativ_singular_definite").children("original").html();
            //TranslateDef = nounXML.children("accusativ_singular_definite").children("translate").html();
          table.append($("<tr>").append($("<td>").html("akuzativ")).append($("<td>").addClass(highlight == "accusativ_singular_indefinite" ? "active" : "").html(OriginalInd)).append($("<td>").addClass(highlight == "accusativ_singular_definite" ? "active" : "").html(OriginalDef)));
            OriginalInd = nounXML.children("dativ_singular_indefinite").children("original").html();
            //TranslateInd = nounXML.children("dativ_singular_indefinite").children("translate").html();
            OriginalDef = nounXML.children("dativ_singular_definite").children("original").html();
            //TranslateDef = nounXML.children("dativ_singular_definite").children("translate").html();
          table.append($("<tr>").append($("<td>").html("dativ")).append($("<td>").addClass(highlight == "dativ_singular_indefinite" ? "active" : "").html(OriginalInd)).append($("<td>").addClass(highlight == "dativ_singular_definite" ? "active" : "").html(OriginalDef)));
            OriginalInd = nounXML.children("genitiv_singular_indefinite").children("original").html();
            //TranslateInd = nounXML.children("genitiv_singular_indefinite").children("translate").html();
            OriginalDef = nounXML.children("genitiv_singular_definite").children("original").html();
            //TranslateDef = nounXML.children("genitiv_singular_definite").children("translate").html();
          table.append($("<tr>").append($("<td>").html("genitiv")).append($("<td>").addClass(highlight == "genitiv_singular_indefinite" ? "active" : "").html(OriginalInd)).append($("<td>").addClass(highlight == "genitiv_singular_definite" ? "active" : "").html(OriginalDef)));
          table.append($("<tr>").append($("<th>").attr("colspan",3).html("Množné číslo")));
          OriginalDef = nounXML.children("nominativ_plural_definite").children("original").html();
          table.append($("<tr>").append($("<td>").html("nominativ")).append($("<td>")).append($("<td>").addClass(highlight == "nominativ_plural_definite" ? "active" : "").html(OriginalDef)));
          OriginalDef = nounXML.children("accusativ_plural_definite").children("original").html();
          table.append($("<tr>").append($("<td>").html("accusativ")).append($("<td>")).append($("<td>").addClass(highlight == "accusativ_plural_definite" ? "active" : "").html(OriginalDef)));
          OriginalDef = nounXML.children("dativ_plural_definite").children("original").html();
          table.append($("<tr>").append($("<td>").html("dativ")).append($("<td>")).append($("<td>").addClass(highlight == "dativ_plural_definite" ? "active" : "").html(OriginalDef)));
          OriginalDef = nounXML.children("genitiv_plural_definite").children("original").html();
          table.append($("<tr>").append($("<td>").html("genitiv")).append($("<td>")).append($("<td>").addClass(highlight == "genitiv_plural_definite" ? "active" : "").html(OriginalDef)));
          table.append("</table>");
          return table;

  }

}

function verb(xmlDoc, lang="none", highlight = "none") {

  var verbXML = xmlDoc.children("verb");
  
  if (lang=="in") {
    /* Bahasa Indonesia */
    return verbXML.children("original").html() + "-" + verbXML.children("translate").html(); 
  } else if (lang=="de") {
          console.log("avt");
          /* Deutsch */
          /* create a table with german verb present time forms and highlight the current form */
          table = $("<table>").addClass("verb"); 
          verbOriginal = verbXML.children("original").html();
          verbTranslate = verbXML.children("translate").html();
          
          console.log(highlight + "t");

          table.append($("<tr>").append($("<th>").attr("colspan",2).html(verbOriginal + " - " + verbTranslate).addClass(highlight == "infinitiv" ? "active" : "")));
            OriginalSing = verbXML.children("first_person_singular").children("original").html();
            TranslateSing = verbXML.children("first_person_singular").children("translate").html();
            OriginalPlur = verbXML.children("first_person_plural").children("original").html();
            TranslatePlur = verbXML.children("first_person_plural").children("translate").html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "first_person_singular" ? "active" : "").html(OriginalSing + " - " + TranslateSing)).append($("<td>").addClass(highlight == "first_person_plural" ? "active" : "").html(OriginalPlur + " - " + TranslatePlur)));
            OriginalSing = verbXML.children("second_person_singular").children("original").html();
            TranslateSing = verbXML.children("second_person_singular").children("translate").html();
            OriginalPlur = verbXML.children("second_person_plural").children("original").html();
            TranslatePlur = verbXML.children("second_person_plural").children("translate").html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "second_person_singular" ? "active" : "").html(OriginalSing + " - " + TranslateSing)).append($("<td>").addClass(highlight == "second_person_plural" ? "active" : "").html(OriginalPlur + " - " + TranslatePlur)));
            OriginalSing = verbXML.children("third_person_singular_he").children("original").html();
            TranslateSing = verbXML.children("third_person_singular_he").children("translate").html();
            OriginalPlur = verbXML.children("third_person_plural_they").children("original").html();
            TranslatePlur = verbXML.children("third_person_plural_they").children("translate").html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "third_person_singular" ? "active" : "").addClass("noBottomBorder").html(OriginalSing + " - " + TranslateSing)).append($("<td>").attr("rowspan",3).addClass(highlight == "third_person_plural" ? "active" : "").html(OriginalPlur + " - " + TranslatePlur)));
            OriginalSing = verbXML.children("third_person_singular_she").children("original").html();
            TranslateSing = verbXML.children("third_person_singular_she").children("translate").html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "third_person_singular" || highlight == "third_person_singular_she" ? "active" : "").addClass("noBottomBorder").addClass("noTopBorder").html(OriginalSing + " - " + TranslateSing)));
            OriginalSing = verbXML.children("third_person_singular_it").children("original").html();
            TranslateSing = verbXML.children("third_person_singular_it").children("translate").html();
          table.append($("<tr>").append($("<td>").addClass(highlight == "third_person_singular" ? "active" : "").addClass("noTopBorder").html(OriginalSing + " - " + TranslateSing)));
          console.log(table);
          return table; 
  }
}

function translation(xmlDoc, lang="none", highlight = "none") {

  var root = xmlDoc.children("translation");
  
  if (lang=="in") {
    /* Bahasa Indonesia */
    return root.html();  
  } else  {
    return root.html();
  }
}

function pronoun(xmlDoc, lang="none", highlight = "none") {

  var root = xmlDoc.children("pronoun");
  
  if (lang=="in") {
    /* Bahasa Indonesia */
  return root.children("original").html() + " - " + root.children("translate").html();
  } else if (lang == "de") {
table = $("<table>").addClass("verb"); //class verb is used for all file types, originaly created for verbs
          Original = xmlDoc.children("pronoun").children("original").html();
          Translate = xmlDoc.children("pronoun").children("translate").html();        
          

          table.append($("<tr>").append($("<th>").attr("colspan",3).html(Original + " - " + Translate)));
          table.append($("<tr>").append($("<th>").html("pád")).append($("<th>").html("tvar")).append($("<th>").html("překlad")));                                                               
            OriginalInd = xmlDoc.children("pronoun").children("nominativ_singular").children("original").html();
            TranslateInd = xmlDoc.children("pronoun").children("nominativ_singular").children("translate").html();
            //OriginalDef = xmlDoc.children("pronoun").children("nominativ_singular_definite").children("original").html();
            //TranslateDef = xmlDoc.children("pronoun").children("nominativ_singular_definite").children("translate").html();
          table.append($("<tr>").append($("<td>").html("nominativ")).append($("<td>").addClass(highlight == "nominativ_singular" ? "active" : "").html(OriginalInd)).append($("<td>").addClass(highlight == "nominativ_singular_" ? "active" : "").html(TranslateInd)));
            OriginalInd = xmlDoc.children("pronoun").children("accusativ_singular").children("original").html();
            TranslateInd = xmlDoc.children("pronoun").children("accusativ_singular").children("translate").html();
            //OriginalDef = xmlDoc.children("pronoun").children("accusativ_singular_definite").children("original").html();
            //TranslateDef = xmlDoc.children("pronoun").children("accusativ_singular_definite").children("translate").html();
          table.append($("<tr>").append($("<td>").html("akuzativ")).append($("<td>").addClass(highlight == "accusativ_singular" ? "active" : "").html(OriginalInd)).append($("<td>").addClass(highlight == "accusativ_singular" ? "active" : "").html(TranslateInd)));
            OriginalInd = xmlDoc.children("pronoun").children("dativ_singular").children("original").html();
            TranslateInd = xmlDoc.children("pronoun").children("dativ_singular").children("translate").html();
            //OriginalDef = xmlDoc.children("pronoun").children("dativ_singular_definite").children("original").html();
            //TranslateDef = xmlDoc.children("pronoun").children("dativ_singular_definite").children("translate").html();
          table.append($("<tr>").append($("<td>").html("dativ")).append($("<td>").addClass(highlight == "dativ_singular" ? "active" : "").html(OriginalInd)).append($("<td>").addClass(highlight == "dativ_singular" ? "active" : "").html(TranslateInd)));
            OriginalInd = xmlDoc.children("pronoun").children("genitiv_singular").children("original").html();
            TranslateInd = xmlDoc.children("pronoun").children("genitiv_singular").children("translate").html();
            //OriginalDef = xmlDoc.children("pronoun").children("genitiv_plural").children("original").html();
            //TranslateDef = xmlDoc.children("pronoun").children("genitiv_plural").children("translate").html();
          table.append($("<tr>").append($("<td>").html("genitiv")).append($("<td>").addClass(highlight == "genitiv_singular" ? "active" : "").html(OriginalInd)).append($("<td>").addClass(highlight == "genitiv_singular" ? "active" : "").html(TranslateInd)));
          table.append("</table>");
          return table;

  } else {
    return root.children("translate").html();
  }
}

function phrase(xmlDoc, lang="none", highlight = "none") {

  var root = xmlDoc.children("phrases");
  
  if (lang=="de") {
          if (root.children("gender").length > 0) {
          switch (root.children("gender").html()) {
            case "masculine": Gender = "mužský rod"; break;
            case "feminine": Gender = "ženský rod"; break;
            case "neutral": Gender = "střední rod"; break;
          }
          Gender = " (" + Gender + ")";
          }
          Original = root.children("original").html();
          Translate = root.children("translation").html();
          
          table = $("<table>").addClass("verb");
          table.append($("<tr>").append($("<th>").attr("colspan",2).html(Original + " - " + Translate + Gender)));
          table.append($("<tr>").append($("<th>").html("tvar")).append($("<th>").html("překlad")));
          var phrases = root.find("phrase");
          phrases.each( function(index) {
            var highlightWhat = $(this).attr("highlight");
            Original = $(this).children("original").html();
            Translate = $(this).children("translation").html();
            table.append($("<tr>").append($("<td>").addClass(highlight == highlightWhat ? "active" : "").html(Original)).append($("<td>").addClass(highlight == highlightWhat ? "active" : "").html(Translate)));
          });
          table.append("</table>");
          return table;
  } else if (lang =="in") {
            return root.children("original").html() + " - " + root.children("translation").html(); 
            

  } else {
    return root.children("translation").html();
  }
}


function relations(xmlDoc, lang="none", highlight = "none") {

  var root = xmlDoc.children("relations");
  
  if (lang=="in") {
  return root.html();
  } else {
    return root.html();
  } 
}

function grammar(xmlDoc, lang="none", highlight = "none") {

  var root = xmlDoc.children("grammar");
  
  if (lang=="in") {
  return root.html();
  } else {
    return root.html();
  } 
}

function adjective(xmlDoc, lang="none", highlight = "none") {

  var root = xmlDoc.children("adjective");
  
  if (lang=="in") {
  //structure:
      //<adjective>
      //<original>baru</original>
      //<translate>nový, nová</translate>
      //</adjective>
      return root.children("original").html() + " - " + root.children("translate").html(); 
  
  } else {
    return root.children("translate").html();
  } 
}

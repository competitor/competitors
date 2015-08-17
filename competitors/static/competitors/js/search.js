$("#search_area_country_scroll").val(10);
var tp
var cat = $("#search_cat").val();
var cid = $("#search_cid").val();
console.log(cid)
var listname = [];
var couid=$("#search_country").val();
var leaid=$("#search_league").val();
var teaid=$("#search_team").val();
var natid=$("#search_nation").val();
if (cid != 0 && cid != "NaN"){
	tp_select(parseInt(cid))
	if (typeof(cat)!="undefined"){
		createSub(cat)
		if(typeof(couid)!="undefined" & typeof(leaid)!="undefined" && typeof(natid)!="undefined" && typeof(teaid)!="undefined"){
			console.log(couid+leaid+natid+teaid)
			
				$("#search_area_country_scroll").val(couid);
			
				createSub_all('country')					
				$("#search_area_league_scroll").val(leaid);
				// alert(111)
				createSub_all('league')

				if (tp=="player"){
					$("#search_area_team_scroll").val(teaid);
					createSub_all('team')
					$("#search_area_nation_scroll").val(natid);
					createSub_all('nation')
				}
			

				history.replaceState(null, "A new title!", 'http://localhost:8000/search_page?cid='+cid+'&cat='+cat+'&country='+couid+'&league='+leaid+'&nation='+natid+'&team='+teaid)		
		}
	}
}
function tp_select(id){
	cid = id;
	if (id == 1){
		$("#tp_p img").attr("style","opacity:0.5");
		$("#tp_t img").attr("style","opacity:1");
		$("#tp_p button").prop("disabled",false)
		$("#tp_t button").prop("disabled",true)
		$("#search_player").attr("style","display:none");
		tp = "team";
	}
	else if (id == 2){
		$("#tp_t img").attr("style","opacity:0.5");
		$("#tp_p img").attr("style","opacity:1");
		$("#tp_t button").prop("disabled",false)
		$("#tp_p button").prop("disabled",true)
		$("#search_player").attr("style","display:block");
		tp = "player";
	}
	$("#category_sub").attr("style","display:block");
	$("#search_area").css('display','none');
	history.replaceState(null, "A new title!", 'http://localhost:8000/search_page?cid='+cid);
	listname = ['country','league','nation','team'];
}




var token = $('input[name="csrfmiddlewaretoken"]').prop('value');


function createSub(category){
	if (category)
		cat = category;

	$("#search_area").attr("style","display:block");
	$(".category_icon img").attr("style","background:none")
	$("#"+cat+"_icon img").attr("style","background:rgba(230,230,230,0.6)")
	listname = ['country','league','nation','team'];
	createSub_all();
	
	
	
}



function createSub_all(area){
	$("#search_result").empty();
	
	var listname=['country','league','nation','team'];
	if (tp=="team")
		listname = ['country','league']
	if (typeof(area) != "undefined"){
		// for (var i in listname){
		// 	if ($("#search_area_"+listname[i]+"_scroll").val()>0){
				
		// 		listname.splice(i,1);

		// 	}

		if (tp=='team'){
			if (area == "country"){
				listname = ['league']
			}else if (area == "league"){
				listname = []
			}
		}else if (tp=='player'){
			if (area == "country"){
				listname = ['league','team','nation']
			}else if (area == "league"){
				listname = ['team','nation']
			}else if (area == "team"){
				listname = ['nation']
			}else if (area == "nation"){
				listname = []
				if ($("#search_area_team_scroll").val()==0)
					listname.push('team')
				if ($("#search_area_league_scroll").val()==0)
					listname.push('league')
				if ($("#search_area_country_scroll").val()==0)
					listname.push('country')
			}
		}
	}
	console.log(listname)
	var message="";
	for (var i in listname){
		$("#search_area_"+listname[i]+"_scroll").empty();
		$("#search_area_"+listname[i]+"_scroll").append("<option value=\"0\">All</option>")
	}
	var method = "POST";
	message = ""
	var country = parseInt($("#search_area_country_scroll").val());
	$('#search_area_country p').remove();
	message = message+"&country="+country;
	
	var league = parseInt($("#search_area_league_scroll").val());
	$('#search_area_league p').remove();
	message = message+"&league="+league;
	
	var nation = parseInt($("#search_area_nation_scroll").val());
	$('#search_area_nation p').remove();
	message = message+"&nation="+nation;

	var team = parseInt($("#search_area_team_scroll").val());
	$('#search_area_team p').remove();
	message = message+"&team="+team;
	
	
	history.replaceState(null, "A new title!", 'http://localhost:8000/search_page?cid='+cid+'&cat='+cat+'&country='+country+'&league='+league+'&nation='+nation+'&team='+team)
	
	token = $('input[name="csrfmiddlewaretoken"]').prop('value');

	for (var i in listname){
		query(listname[i]);
	}
	query(tp);
	


	function query(name){
		
		$.ajax({
			type: method,
		    url: "/get_"+name+"_list",
		    data:"data="+cat+message+"&csrfmiddlewaretoken="+token,
		    dataType : "json",
		    async:false,
		    success: function(items) {

		    	if (name == 'league' || name=='country' || name == 'nation' || (name=='team' && tp=='player')){

		    		createoption(items,name);
		    	}else{

	        		createpanel(items);
		    	}
		        
		    }
		})
}

	function createpanel(items){

		$(items).each(function(){
			var content = '<div class=\"recommend_player_each\">'
			+'<a href=\"/'+tp+'/'+this.pk+'\">'
			+'	<div class=\"panel\">'
			+'	<div class=\"recommend_player_each_img\">'
			+'			<img src=\"'+ this.fields.icon_url+'\">'
			+'	</div>'
			+'		<div class=\"recommend_player_each_info\">'
			+'			<h6>'+this.fields.name+'</h6>'

			+'			</div>'
			+'		</div>'
			+'	</a>'
			+'	</div>	'
			$("#search_result").append(content);
		})
	}

	function createoption(items,name){
		$("#search_area_"+listname+"_scroll").attr('dir','auto');
		$(items).each(function(){
		
			// var display = this.fields.name;
			// option = document.createElement("option")
			// option.value = this.pk;
			// text = document.createTextNode(display);
			// option.appendChild(text);
			$("#search_area_"+name+"_scroll").append('<option value=\"'+this.pk+'\">'+this.fields.name+'</option>');
		})
	}

		
	
};


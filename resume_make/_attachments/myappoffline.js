		$(function(){
		
		confirm('are u on-line?') ? f_on() : f_off();
	})
		
		
		
		
		
		
		function f_on(){alert("You have alredy confirmed online-mode! Your's data'l be saved on server. Evrth is good. Enjoy the app <<^_^>> be awesome");
		//$(window).on('online', function() {alert("I am online! Evrth is good. Enjoy the app <<^_^>> be awesome");
		
		
		
		
		$('.mail').click(function(){
			$('.mail_form').show();
			$('.shade').show();
		})
		$('.print').click(function(){
			$('.print_form').show();
			$('.shade').show();
		})
		
		
		$('.img_log_bionic').click(function(){
			$('.deer').show();
			$('.shade').show();
		})
		
		
		
		
		
		$('.cancel').click(function(){
			$('.mail_form').hide();
			$('.print_form').hide();
			$('.deer').hide();
			$('.shade').hide();
		})
		
		$('.buttonsend').click(function(){
		var adress='mailto:'+$('.mail_input').val()+'?Subject=Enjoy%20thisApp%20BeAwesome=<^-^>=&body=Resume%20maker%20web-application%20copyrighted%20by%20zernovagg:%20%20/project/_design/resume_make/index_app_eng.html';
		$('.bs').attr('href', adress)
		
		})
		
	
		
		$(window).on('online', function() {alert("I am online! Evrth is good. Enjoy the app <<^_^>> be awesome");});
		$(window).on('offline', function() {alert("I am offline... The offline mode is activate. Enjoy the app <<^_^>> be awesome");
		
		
		
		for (var i in localStorage) {
	var classs = localStorage[i];
			var wrapper_up = $('<div class="blok">').appendTo('.edit').addClass(classs); 
			var input = $('<textarea class="textarea" required spellcheck="true" title="відредагуйте дані та натисніть зберегти">').val(localStorage[i]).appendTo(wrapper_up);
			$('<input type="button" class="buttonsave" value="Зберегти">').appendTo(wrapper_up).click(function(){
			
				localStorage[i]=$(this).siblings('.textarea').val();
				});
			$('<input type="button" class="buttondel" value="Видалити">').appendTo(wrapper_up).click(function(){
									wrapper_up.remove();
			
			});
	}
	
		
		
	
	
		
		var items = ['myname', 'Old', 'Adress', 'Telefon', 'Photo', 'Aim', 'Profile', 'Skills', 'Education', 'Expierence', 'Others']
		
		for(var i in items){
					var blokclass =  items[i];
					
					var message = localStorage[blokclass];
					$('.'+blokclass).find('textarea').val(message);
				}
	

		
		$('.item').click(function(){
		$(this).off('click');
		$(this).click(function(){	alert('Такий блок уже існує')});
			var classs= $(this).attr('id');
			var wrapper = $('<div class="blok">').appendTo('.edit').addClass(classs); 
			var input = $('<textarea class="textarea" spellcheck="true" title="відредагуйте дані та натисніть зберегти">').val(localStorage[classs]).appendTo(wrapper);
			$('<input type="button" class="buttonsave" value="Зберегти">').appendTo(wrapper).click(function(){
			
				localStorage[classs]=$(this).siblings('.textarea').val();
				});
			
			$('<input type="button" class="buttondel" value="Видалити">').appendTo(wrapper).click(function(){
									wrapper.remove();
			
			});
			
			})
		
		
		
		
		
		
		
		
		
		
		
		});

		
		init();
			$('.item').click( function(){
			var thisitem =$(this)
			clickItem(thisitem)});
			
					
			
			$('.register-button').click(function(){
					var userName = $('.register-name').val();
					var password = $('.register-password').val();
					var user = {name: userName, password: password};
					localStorage.user = JSON.stringify(user);
					user.roles = [];
					user.type = 'user';
					user._id = 'org.couchdb.user:' + userName;
					$.ajax({
						url: '/_users',
						type: 'POST',
						dataType: 'json',
						contentType: 'application/json',
						data: JSON.stringify(user)
					}).done(function(){
						$.ajax({
							url: '/_session',
							type: 'POST',
							dataType: 'json',
							contentType: 'application/json',
							data: localStorage.user
						}).done(init);
					});
				});
				$('.login-button').click(function(){
					var userName = $('.login-name').val();
					var password = $('.login-password').val();
					var user = {name: userName, password: password};
					localStorage.user = JSON.stringify(user);
					$.ajax({
						url: '/_session',
						type: 'POST',
						dataType: 'json',
						contentType: 'application/json',
						data: localStorage.user
					}).done(init);
				});
				$('.logout-button').click(function(){
					$.ajax({
						url: '/_session',
						type: 'DELETE'
					}).done(init);
				});
				
				
			$('.photo').click( function(){
			var thisitem =$(this)
			clickPhoto(thisitem)});
			
		
		
				
				
				
		
			
		function clickItem(thisitem){
				
					var message = '';
				var userName = JSON.parse(localStorage.user).name;
				var cforb = thisitem.attr('id'); 
				var item = {message: message, userName: userName, classforblok: cforb};
				$.ajax({
					url: '/project',
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(item)
				}).done(function(response){
					
					addItem(cforb, message, response.id, response.rev);
				});
			}
			
		function clickPhoto(thisitem){
			thisitem.removeClass('decor').addClass('decor_inactive').off('click');
			thisitem.click(function(){alert('Такий блок уже існує. З метою уникненння некоректної роботи застосунку наразі немає можливості додати два однакові блоки. Оберіть інший блок або переходьте до стильового оформлення Вашого резюме на закладку "Віювер"')});
				
			
			
			addAvatar();
			}
		
		function addAvatar(){
		var wrapper = $('<div class="blok yo">').appendTo('#Photo_edit');
			$('<input type="file"/>').appendTo(wrapper);
			$("<img class='pict' src='/project/img/test2.jpeg' alt='Оберіть кнопкою вище файл фотографії для резюме. Для коректного відображення фотографії її розміри мають бути 150х200 пікселів, ширина до висоти в пропорції 3х4'>").appendTo('.yo')	;
			var buttonholder=$('<div class="holdbutton">').appendTo('.yo');
			$('<input type="button" id="upload"  class="buttonsave" value="Завантажити" />').appendTo(buttonholder).click(function(){		
						
				var reader = new FileReader();
				var file = $('[type=file]')[0].files[0];
				reader.readAsDataURL(file);
				$(reader).on('load', function(){
				
				$('.yo').find('img').remove();
				$('<img class="pict" alt="Оберіть кнопкою вище файл фотографії для резюме.3х4">').appendTo('.yo').attr('src', this.result);
								
						
					var base64 = this.result.split(',')[1];
					var doc = {
						_attachments: {
							'test2.jpeg':{
								data: base64,
								content_type: 'image/jpeg'
							}
						}
					}
					
					$.ajax({
					url: '/project/img/',
					type: 'GET',
					dataType: 'json'
							}).done(function(data){
				    rev=data._rev;
					console.log(rev);
					id=data._id;
					url='/project/' + id + '?rev=' + rev;
						$.ajax({
							url: url,
							method: 'PUT',
							contentType: 'application/json',
							dataType: 'json',
							data: JSON.stringify(doc)
								}).done(function(response){
								console.log(response);	$('.pict_v').removeClass('hidden');
			
															});
					
					
					
													}).fail(function(){
											
					$.ajax({
						url: '/project/img/',
						method: 'PUT',
						contentType: 'application/json',
						dataType: 'json',
						data: JSON.stringify(doc)
							}).done(function(response){
						console.log(response); 	$('.pict_v').removeClass('hidden');
														});		
									
									
																		})
					
				});});
				
		$('<input type="button" class="buttondel" value="Видалити">').appendTo(buttonholder).click(function(){
		
	

				$.ajax({
					url: '/project/img/',
					type: 'GET',
					dataType: 'json'
							}).done(function(data){
				    rev=data._rev;
					console.log(rev);
					id=data._id;
					var url = '/project/' + id + '?rev=' + rev;
				$.ajax({
					url: url,
					type: 'DELETE',
					dataType: 'json',
					contentType: 'application/json',
				}).done(function(){
					wrapper.remove(); $('.pict_v').addClass('hidden');
				})							}).fail(function(){
					wrapper.remove(); $('.pict_v').addClass('hidden');
					});
			
			$('.photo').off('click');
			$('.photo').removeClass('decor_inactive').addClass('decor');
			$('.photo').click( function(){
			var thisitem =$(this)
			clickPhoto(thisitem)});
			
			});
		
		}
		
		
		
		
		
		function addItem(classs, message, id, rev){
		 
		$('#'+classs).removeClass('decor').addClass('decor_inactive').off('click');
		$('#'+classs).click(function(){alert('Такий блок уже існує. З метою уникнення некоректної роботи застосунку наразі немає можливості додати два однакові блоки. Оберіть інший блок або переходьте до стильового оформлення Вашого резюме на закладку "Віювер"')});
			
		
		var targ_div=$('#' + classs + '_edit');
		var wrapper = $('<div class="blok">').appendTo(targ_div).addClass(classs); 
			wrapper.attr('data-id', id);
			wrapper.attr('data-rev', rev);
			var input = $('<textarea class="textarea" spellcheck="true" required title="Відредагуйте дані та натисніть кнопку Зберегти">').val(message).appendTo(wrapper);
						
			$('<input type="button" class="buttonsave" value="Зберегти">').appendTo(wrapper).click(function(){
				var $this = $(this);
				var id = $this.parent().attr('data-id');
				var rev = $this.parent().attr('data-rev');
				var url = '/project/' + id + '?rev=' + rev;
				var textInput = $this.parent().find('textarea[class="textarea"]');
				var message = textInput.val();
				var item = {message: message, userName: JSON.parse(localStorage.user).name, classforblok: classs};
				$.ajax({
					url: url,
					type: 'PUT',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(item)
				}).done(function(response){
						
					$this.parent().attr('data-rev', response.rev);
				});
			});
				$('<input type="button" class="buttondel" value="Видалити">').appendTo(wrapper).click(function(){
				var $this = $(this);
				var id = $this.parent().attr('data-id');
				var rev = $this.parent().attr('data-rev');
				var url = '/project/' + id + '?rev=' + rev;
				$.ajax({
					url: url,
					type: 'DELETE',
					dataType: 'json',
					contentType: 'application/json',
				}).done(function(){
					wrapper.remove();
				});
				thisitem=$('#'+classs);
				thisitem.removeClass('decor_inactive').addClass('decor').addClass('item');
				thisitem.off('click');
				thisitem.click( function(){
			var thisitemm =$(this)
			clickItem(thisitemm)});
				
			});
			
	
	
			
			
			$('.myname').find('textarea').attr('placeholder', 'Тут має бути Ваше ім`я ');
			//$('.myname').insertBefore($('.Old'));
			$('.Old').find('textarea').attr('placeholder', 'Введіть сюди дату народження або Ваш вік');
			//$('.Old').insertAfter($('.myname'));
			$('.Adress').find('textarea').attr('placeholder', 'Тут має бути Ваша адреса');	
			//$('.Adress').insertAfter($('.Old'));
			$('.Telefon').find('textarea').attr('placeholder', 'Введіть в це поле контактнй номер телефону +380(хх)ххх-хх-хх');	
			//$('.Telefon').insertAfter($('.Adress'));
			$('.Skills').find('textarea').attr('placeholder', 'Опишіть свої ключові навички та вміння');
			//$('.Skills').insertAfter($('.Profile'));
			$('.Aim').find('textarea').attr('placeholder', 'Введіть посаду, на яку претендуєте. Ціль, що переслідуєте');
			//$('.Aim').insertAfter($('.Telefon'));
			$('.Education').find('textarea').attr('placeholder', 'Вкажіть в цьому полі дані по освіті');
			//$('.Education').insertAfter($('.Skills'));
			$('.Expierence').find('textarea').attr('placeholder', 'Вкажіть в цьому полі досвід попередньої роботи');
			//$('.Expierence').insertAfter($('.Education'));
			$('.other').find('textarea').attr('placeholder', 'Заповніть це поле додатковою інформацією');
			//$('.other').insertAfter($('.Expierence'));
			$('.Profile').find('textarea').attr('placeholder', 'Заповніть це поле короткою інформацією про себе');
			//$('.Profile').insertAfter($('.Aim'));
			
			
	
			
			
			
		}
		
		
					
		
		function init(){
		
		
	
			$('.done').off('click');
			$('.karus_nav').addClass('hidden');
			$('.pict_v').addClass('hidden');
			$('.wrapper_c').addClass('hidden');
			$('.login').addClass('hidden');
			$('.register').addClass('hidden');
			$('.welcome').addClass('hidden');
			$('.edit').addClass('hidden');
			$('.edit_forall').show();
			$('.blok').remove();
			$.ajax({
				url: '/project/_design/resume_make/_list/myDocs/all',
				type: 'GET',
				dataType: 'json'
			}).done(function(data){
				for(var i in data){
					var item = data[i];
					addItem(item.classforblok, item.message, item._id, item._rev);
				}
			});
			
			
			
			$.ajax({
					url: '/project/img/',
					type: 'GET',
					dataType: 'json'
							}).done( function(data){
							
							$('#Photo').removeClass('decor').addClass('decor_inactive').off('click');
							$('#Photo').click(function(){alert('Такий блок уже існує. З метою уникнення некоректної роботи застосунку наразі немає можливості додати два однакові блоки. Оберіть інший блок або переходьте до стильового оформлення Вашого резюме на закладку "Віювер"')});
		
							$('.pict_v').removeClass('hidden');
							if(data._attachments){
						
							addAvatar()
							}
							
							});
			
			
			
			
			$.ajax({
				url: '/_session',
				type: 'GET',
				dataType: 'json'
			}).done(function(data){
				if(data.userCtx.name){
					$('.edit_forall').hide();
					$('.edit').removeClass('hidden');
					$('.wrapper_c').removeClass('hidden');
					$('.karus_nav').removeClass('hidden');
				
				$('.help').addClass('hidden');
				$('.done').click(function(){
	
		
		$('.myname_v').hide();
		$('.Old_v').hide();
		$('.Adress_v').hide();
		$('.Telefon_v').hide();
		$('.Aim_v').hide();
		$('.Profile_v').hide();
		$('.Skills_v').hide();
		$('.Education_v').hide();
		$('.Expierence_v').hide();
		$('.other_v').hide();
		$('.a').addClass('hidden');
		$('.b').addClass('hidden');
		$('.c').addClass('hidden');
		$('.d').addClass('hidden');
		$('.e').addClass('hidden');
		$('.j').addClass('hidden');
		
		
		
		
		
		
				//$('.viewtarget').empty();
				$('.edit').find('textarea').each(function(){

					var content= $(this).val();
					var divclass=$(this).parent().removeClass('blok').attr("class")+'_v';
					$(this).parent().addClass('blok');
					$('.'+ divclass).show().text('');
					var blo = $('.'+ divclass);
					$(blo).parent().removeClass('hidden');
					$('<span>'+content+'</span>').appendTo(blo);
					
					});
					
		
			
					
					
					
				if ($('.yo')) {$(".pict_v").attr('src','/project/img/test2.jpeg')};	
					
					
					
				});
				
				
			
			
				
					if(localStorage.user){
						var user = JSON.parse(localStorage.user);
						user.name = data.userCtx.name;
						localStorage.user = JSON.stringify(user);
						


				
					}
					else{
						localStorage.user = JSON.stringify({name: data.userCtx.name});
					}
					$('.user-name').text(data.userCtx.name);
					$('.welcome').removeClass('hidden');
					$('.karus_nav').removeClass('hidden');
		
					
					
					
				}
				else{
					$('.login').removeClass('hidden');
					$('.help').removeClass('hidden');
					$('.register').removeClass('hidden');
					$('.wrapper_c').addClass('hidden');
					
					if(localStorage.user){
						var user = JSON.parse(localStorage.user);
						$('.login-name').val(user.name);
						$('.login-password').val(user.password);
					}
				}
			});
		}

	
		}
		
		
	
	function f_off(){alert("You have alredy confirmed offline-mode! ALARM!!! ALARM!!! ALARM!! Your data'l be saved in localStorage of your current browser. Дані, збережені в цьому режимі будуть доступні тільки в цьому режимі=) та НЕ будуть синхронізовані з данимим на сервері при переході в режим онлайн. Enjoy the app <<^_^>> be awesome");

	
	
	//$(window).on('offline', function() {alert("I am offline... The offline mode is activate. Enjoy the app <<^_^>> be awesome");
	$('.photo').removeClass('item');
	
		$('.mail').click(function(){
			$('.mail_form').show();
			$('.shade').show();
		})
		$('.print').click(function(){
			$('.print_form').show();
			$('.shade').show();
		})
		
		$('.img_log_bionic').click(function(){
			$('.deer').show();
			$('.shade').show();
		})
		
		
		
		
		
		$('.cancel').click(function(){
			$('.mail_form').hide();
			$('.print_form').hide();
			$('.deer').hide();
			$('.shade').hide();
		})
		
		$('.buttonsend').click(function(){
	alert('u r not online. sorry this feature is unavailable in this mode');
		})
		

		
		
		
		initOff();
			$('.item').click( function(){
			var thisitem =$(this)
			clickItemOff(thisitem)});
			
					
				
			$('.photo').click( function(){
			var thisitem =$(this)
			clickPhotoOff(thisitem)});
			
		function clickItemOff(thisitem){
				
					var message = '';

				var cforb = thisitem.attr('id'); 
	
				
				addItemOff(cforb, message);
				}
			
	
			
			
			
		function clickPhotoOff(thisitem){
			thisitem.removeClass('decor').addClass('decor_inactive');
			
				
			
			
			addAvatarOff();
			}
			
			
			
		
	
		
		function addAvatarOff(){
		alert('sorry. fail. this feature is unavailable in offline mode. try online!')
		
		}
		
		
		
		
		
	
		
		function addItemOff(classs, message){
		 
		$('#'+classs).removeClass('decor').addClass('decor_inactive').off('click');
		$('#'+classs).click(function(){alert('Такий блок уже існує. З метою уникнення некоректної роботи застосунку наразі немає можливості додати два однакові блоки. Оберіть інший блок або переходьте до стильового оформлення Вашого резюме на закладку "Віювер"')});
			
		
		var targ_div=$('#' + classs + '_edit');
		var wrapper = $('<div class="blok">').appendTo(targ_div).addClass(classs); 
		
			var input = $('<textarea class="textarea" spellcheck="true" required title="Відредагуйте дані та натисніть кнопку Зберегти">').val(message).appendTo(wrapper);
						
			$('<input type="button" class="buttonsave" value="Зберегти">').appendTo(wrapper).click(function(){

				var $this = $(this);
				
				var textInput = $this.parent().find('textarea[class="textarea"]');
				var message = textInput.val();
				
				localStorage[classs]=message;
			
				})
			;
			
				$('<input type="button" class="buttondel" value="Видалити">').appendTo(wrapper).click(function(){
			
					wrapper.remove();
				localStorage.removeItem(classs);
				thisitem=$('#'+classs);
				thisitem.removeClass('decor_inactive').addClass('decor').addClass('item');
				thisitem.off('click');
				thisitem.click( function(){
			var thisitemm =$(this)
			clickItemOff(thisitemm)});
				
			});
			
	
	
			
			
			$('.myname').find('textarea').attr('placeholder', 'Тут має бути Ваше ім`я ');
			//$('.myname').insertBefore($('.Old'));
			$('.Old').find('textarea').attr('placeholder', 'Введіть сюди дату народження або Ваш вік');
			//$('.Old').insertAfter($('.myname'));
			$('.Adress').find('textarea').attr('placeholder', 'Тут має бути Ваша адреса');	
			//$('.Adress').insertAfter($('.Old'));
			$('.Telefon').find('textarea').attr('placeholder', 'Введіть в це поле контактнй номер телефону +380(хх)ххх-хх-хх');	
			//$('.Telefon').insertAfter($('.Adress'));
			$('.Skills').find('textarea').attr('placeholder', 'Опишіть свої ключові навички та вміння');
			//$('.Skills').insertAfter($('.Profile'));
			$('.Aim').find('textarea').attr('placeholder', 'Введіть посаду, на яку претендуєте. Ціль, що переслідуєте');
			//$('.Aim').insertAfter($('.Telefon'));
			$('.Education').find('textarea').attr('placeholder', 'Вкажіть в цьому полі дані по освіті');
			//$('.Education').insertAfter($('.Skills'));
			$('.Expierence').find('textarea').attr('placeholder', 'Вкажіть в цьому полі досвід попередньої роботи');
			//$('.Expierence').insertAfter($('.Education'));
			$('.other').find('textarea').attr('placeholder', 'Заповніть це поле додатковою інформацією');
			//$('.other').insertAfter($('.Expierence'));
			$('.Profile').find('textarea').attr('placeholder', 'Заповніть це поле короткою інформацією про себе');
			//$('.Profile').insertAfter($('.Aim'));
			
			
		/*if($('.myname').length){$('#myname').removeClass('decor').addClass('decor_inactive')};
		if($('.Old').length){$('#Old').removeClass('decor').addClass('decor_inactive')};
		if($('.Adress').length){$('#Adress').removeClass('decor').addClass('decor_inactive')};
		if($('.Telefon').length){$('#Telefon').removeClass('decor').addClass('decor_inactive')};
		if($('.Skills').length){$('#Skills').removeClass('decor').addClass('decor_inactive')};
		if($('.Aim').legth){$('#Aim').removeClass('decor').addClass('decor_inactive')};
		if($('.Education').length){$('#Education').removeClass('decor').addClass('decor_inactive')};
		if($('.Expierence').length){$('#Expierence').removeClass('decor').addClass('decor_inactive')};
		if($('.Profile').length){$('#Profile').removeClass('decor').addClass('decor_inactive')};
		if($('.other').length){$('#other').removeClass('decor').addClass('decor_inactive')};
		if($('.yo').length){$('#Photo').removeClass('decor').addClass('decor_inactive')};
			
			
			*/
			
			
			
		}
					
	
		
		
		function initOff(){
		
		
	
			$('.done').off('click');
			$('.karus_nav').addClass('hidden');
			$('.header_1').addClass('hidden');
			$('.pict_v').addClass('hidden');
			$('.wrapper_c').removeClass('hidden');
			$('.login').addClass('hidden');
			$('.register').addClass('hidden');
			$('.welcome').addClass('hidden');
			$('.edit').removeClass('hidden');
			$('.help').addClass('hidden');
				$('.edit_forall').hide();
			$('.blok').remove();
		
				
				var items = ['myname', 'Old', 'Adress', 'Telefon', 'Aim', 'Profile', 'Skills', 'Education', 'Expierence', 'other']
		
		for(var i in items){
					var blokclass =  items[i];
					var message = localStorage.getItem(blokclass);
		
				 if (message!==null) { addItemOff(blokclass, message)};
				}
			
			
			
			
		
			
			
			
		
			
				$('.done').click(function(){
						
		$('.myname_v').hide();
		$('.Old_v').hide();
		$('.Adress_v').hide();
		$('.Telefon_v').hide();
		$('.Aim_v').hide();
		$('.Profile_v').hide();
		$('.Skills_v').hide();
		$('.Education_v').hide();
		$('.Expierence_v').hide();
		$('.other_v').hide();
		$('.a').addClass('hidden');
		$('.b').addClass('hidden');
		$('.c').addClass('hidden');
		$('.d').addClass('hidden');
		$('.e').addClass('hidden');
		$('.j').addClass('hidden');
		
							
				$('.edit').find('textarea').each(function(){

					var content= $(this).val();
					var divclass=$(this).parent().removeClass('blok').attr("class")+'_v';
					$(this).parent().addClass('blok');
					$('.'+ divclass).show().text('');
					var blo = $('.'+ divclass);
					$(blo).parent().removeClass('hidden');
					$('<span>'+content+'</span>').appendTo(blo);
					
					});
								
					
		
					
					
					
				});
			
			
			
			
			
			
			
		}





































		

}

	
	
	
	
		
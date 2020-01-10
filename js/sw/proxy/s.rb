require 'sinatra'
require 'httpclient'
require 'json'
require 'rack'
require 'rack/contrib'
require 'rack/contrib/post_body_content_type_parser'

def show(*x)
   puts '-'*100
   for i in 0...x.length
       puts x[i]
   end
   puts '-'*100
end

class Cors < Sinatra::Base
    enable :sessions
    set :session_store, Rack::Session::Pool
    before do
      path=request.url.gsub(/.*@@/,"") .gsub(':/',"://")
      session['url'] = path
      cache_control :public, :max_age => 36000
      puts request
      h0={
        "Access-Control-Allow-Origin" => "*",
        "Access-Control-Allow-Methods" =>"BREW, POST, GET, PUT,DELETE, OPTION, PROPFIND, WHEN, OPTIONS",
        "Access-Control-Allow-Headers" => "*", #"X-PINGOTHER, Content-Type",
        "Access-Control-Max-Age"=>"86400"
       # "Set-Cookie" => "ddd1=1; path=/; Max-Age=300000",
      }
      headers h0
    end
end

class App < Sinatra::Base
    use Rack::Profiler if ENV['RACK_ENV'] == 'development'
    use Rack::ETag
    use Rack::MailExceptions    
    use Rack::PostBodyContentTypeParser

    use Cors
    before do
      @u=session['url']
      show @u
      unless @u.size>0
        halt "no url"
      end
      if request.body.size > 0
        #request.body.rewind
        #@request_payload = JSON.parse request.body.read
        puts params
      end 
    end
    $:.unshift(File.join('..', 'lib'))
    proxy = ENV['HTTP_PROXY']
    client= HTTPClient.new(proxy)
    client.set_cookie_store("cookie.dat")
    not_found do
        'nothing'
    end    
    get '*' do
      r=client.get(@u)
      #client.save_cookie_store
      if r.status== 302 then
         puts r.headers['Location'] 
      else 
          a=[r.status, r.headers,r.body]
          puts a
          a
      end
    end

    post '*' do
      r=client.post(@u)
      [r.status, r.headers,r.body]
    end

    put '*' do
      #puts request.body
      r=client.post(@u)
      if r.status== 302 then

      else 
          [r.status, r.headers,r.body]
      end
    end
    delete '*' do
          r=client.delete(@u)
          [r.status, r.headers,r.body]
    end
end

App.run!


=begin
  puts request.scheme
  puts request.cookies
  puts request.path

class MyApp < Sinatra::Base
  use LoginScreen


  get('/') { "Hello #{session['user_name']}." }
end
=end


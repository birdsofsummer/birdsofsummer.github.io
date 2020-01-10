-module(sort).
-export([get_function_name/2,help/0,sort_function_name/2,sort_function_name/1]).


help()->
    io:format("sort:get_function_name(\"1.js\",\"2.txt\").").

get_function_name (F1,F2)->
    Read=fun(Name)->file:read_file(Name) end,
    Split=fun(B)->[ string:trim(X) ||X<-(string:split(binary:bin_to_list(B),"\n",all))] end,
    Write=fun(Name,C)->file:write_file(Name,[["\t",Y,"\n"]||Y<-C]) end,
    Sort2=fun(B)->lists:filter(fun(X)->string:length(X)>0 end,lists:sort(B)) end,
    {_,A}=Read(F1),
    A1=Split(A),
    A2=[Z||{match,[[Z]]}<-lists:filter(fun(X)->case X of {match,_}->true;_->false end end, [re:run(X,"^const\s+([A-Za-z0-9]+)=",[global,{capture,[1],list}]) || X<- A1 ])],
    A3=[X++","||X<-Sort2(A2)],
    Write(F2,A3).

sort_function_name(F1,F2)->
   Read=fun(Name)->file:read_file(Name) end,
   Split=fun(B)->[ string:trim(X) ||X<-(string:split(binary:bin_to_list(B),"\n",all))] end,
   Sort1=fun({_,B})->lists:filter(fun(X)->string:length(X)>0 end,lists:sort(Split(B))) end,
   Write=fun(Name,C)->file:write_file(Name,[["\t",Y,"\n"]||Y<-C]) end,
   MySort=fun(Name1,Name2)->Write(Name2,Sort1(Read(Name1)))end,
   MySort(Read(F1),F2).  

sort_function_name(C1)->
   MySort1=fun(C)->file:write_file("1.txt",[["\t",Y,",\n"]||Y<-[atom_to_binary(X,utf8)|| X<-lists:sort(C)]]) end,
   MySort1(C1).

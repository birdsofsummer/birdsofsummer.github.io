Making reliable distributed systems in the presence of sodware errors ,Joe Armstrong

#Erlang

### pattern

```erlang

{P1,P2,...,Pn}={T1,T2,...,Tn}
{P,abcd}={123,abcd}.
[H|T]=[79,116].


{P,abc,123} when    P == G,...
                    X > Y
                    X < Y
                    X =< Y
                    X >= Y
                    X == Y
                    X /= Y
                    X =:= Y
                    X =/= Y

{X,a,X,[B|X]} 
%{X,a,F1,[B|F2]} when F1==X, F2==X

```
### function

    F(P11,...,P1N) when G11,...,G1N -> Body1;
    F(P21,...,P2N) when G11,...,G1N -> Body2;
    ....
    F(PK1, PK2, ..., PKN) -> BodyK.

```erlang

factorial(0) -> 1;
factorial(N) -> N * factorial(N-1).


member(H, [H|T]) -> true;
%member(H, [H1|_]) when H == H1 -> true;
member(H, [_|T] -> member(H, T);
member(H, []) -> false.

%%member(dog, [cat,man,dog,ape]) 


deposit(Who, Money) ->
Old = lookup(Who),
New = Old + Money,
insert(Who, New),
New.

%%deposit(joe, 25)

```
### tail-recursive

    fn(X1,Tails...)
    fn(X2,Tails...)
    fn(X3,Tails...)

```erlang

factorial(0) -> 1;
factorial(N) -> N * factorial(N-1).



%%tail
factorial(N) -> factorial_1(N, 1).
factorial_1(0, X) -> X;
factorial_1(N, X) -> factorial_1(N-1, N*X).


loop(Dict) ->
    receive
        {store, Key, Value} -> loop(dict:store(Key, Value, Dict));
        {From, {get, Key}} -> From ! dict:fetch(Key, Dict), loop(Dict)
    end.


```
### case

    case Expression of
    Pattern1 -> Expr_seq1;
    Pattern2 -> Expr_seq2;
    ...
    end


### if

    if
        Guard1 ->
            Expr_seq1;
        Guard2 ->
            Expr_seq2;
        ...
    end

### Higher order functions

    F=fun(I) -> ...I end
    map(F, [H|T]) -> [F(H)|map(F, T)];
    map(F, []) -> [].

```erlang
    lists:map(fun(I) -> 2 *I end, [1,2,3,4]).


    for(I, Max, F, Sum) when I < Max -> for(I+1, Max, F, Sum + F(I));
    for(I, Max, F, Sum) -> Sum.
    Sum0 = 0,Sum = for(0, Max, F, Sum0).
    %curry
    %f(X1)->f(X2)->...end end

    Adder = fun(X) -> fun(Y) -> X + Y end end.
    Adder10 = Adder(10).
    Adder10(5).

    % lambda
    Fact = fun(X) ->
                G = fun(0,F) -> 1;
                        (N, F) -> N*F(N-1,F)
                    end,
                G(X, G)
            end.
    Fact(4)


    X = fun foo/2 
    %X = fun(I, J) -> foo(I, J) end 








```
### list

    [X || Qualifier1, Qualifier2, ...]

```erlang

    qsort([]) -> [];
    qsort([Pivot|T]) ->
    qsort([X||X<-T,X =< Pivot]) ++ [Pivot] ++ qsort([X||X<-T,X > Pivot]).  % =<

    perms([]) -> [[]];
    perms(L) -> [[H|T] || H <- L, T <- perms(L--[H])].

   % perms("123").
   % ["123","132","213","231","312","321"]

```


### binary

```erlang
B1=list_to_binary([1,2,3]).
B2=list_to_binary([4,5,[6,7],[],[8,[9]],245]).
B3=concat_binary([B1,B2]).
split_binary(B3,6).
B = term_to_binary({hello,"joe"}).
binary_to_term(B).
```
### bit

<<Value:Size/TypeSpecifierList>>
            End-Sign-Type-Unit
            big/little/native - signed/unsigned - integer/float/binary - 1..256


```erlang
X=1,Y1=1,Y2=255,Y3=256,Z=1.
<<X,Y1,Z>>.
<<X,Y2,Z>>.
<<X,Y3,Z>>.
<<X,Y3:16,Z>>.
<<X,Y3:32,Z>>.
<<256:32>>.
<<256:32/big>>.
<<256:32/little>>.
<<1:1,2:7>>.
<<X:1,Y:7>> = <<130>>.
X.
Y.

-define(IP_VERSION, 4).
-define(IP_MIN_HDR_LEN, 5).
%...
DgramSize = size(Dgram),
case Dgram of
    <<?IP_VERSION:4, HLen:4, SrvcType:8, TotLen:16,
    ID:16, Flgs:3, FragOff:13,
    TTL:8, Proto:8, HdrChkSum:16,
    SrcIP:32,
    DestIP:32, RestDgram/binary>> when HLen >= 5, 4*HLen =< DgramSize ->
        OptsLen = 4*(HLen - ?IP_MIN_HDR_LEN),
        <<Opts:OptsLen/binary,Data/binary>> = RestDgram,
        %...

```
### Records

-record(Name, {
                Key1 = Default1,
                Key2 = Default2,
                ...
              }).

```erlang
-record(person, {
                firstName="",
                lastName = "",
                age}).


Person = #person{
                    firstName="Rip",
                    lastname="Van Winkle",
                    age=793
                }


birthday(X=#person{age=N}) -> X#person{age=N+1}.


```

### Macros 

```erlang
    -define(Constant, Replacement).
    -define(Func(Var1, Var2,.., Var), Replacement).

    -define(macro1(X, Y), {a, X, Y}).
    -define(start, {).
    -define(stop, }).


    foo(A) ->
        ?macro1(A+10, b) 
        %{a,A+10,b}. 
    foo(A) ->
    ?start,a,?stop. %{...}

    ?FILE
    ?MODULE
    ?LINE
```

### Include files
```erlang

-include(Filename).
-include_lib(Name).
-include_lib("kernel/include/file.hrl").


```

### module
```erlang
-module(math).
-export([areas/1]).  %% math:areas(...)
-import(lists, [map/2]). %% lists:map

areas(L) -> lists:sum( map( fun(I) -> area(I) end, L)). 
area({square, X}) -> X*X;
area({rectangle,X,Y}) -> X*Y.
```

```shell
erl
c(math).
math : areas([{rectangle, 12, 4}, {square, 6}]).
```




 erlang: 
'!'/2                              '*'/2                              
'+'/1                              '+'/2                              
'++'/2                             '-'/1                              
'-'/2                              '--'/2                             
'/'/2                              '/='/2                             
'<'/2                              '=/='/2                            
'=:='/2                            '=<'/2                             
'=='/2                             '>'/2                              
'>='/2                             'and'/2                            
'band'/2                           'bnot'/1                           
'bor'/2                            'bsl'/2                            
'bsr'/2                            'bxor'/2                           
'div'/2                            'not'/1                            
'or'/2                             'rem'/2                            
'xor'/2                            abs/1                              
adler32/1                          adler32/2                          
adler32_combine/3                  alloc_info/1                       
alloc_sizes/1                      append/2                           
append_element/2                   apply/2                            
apply/3                            atom_to_binary/2                   
atom_to_list/1                     binary_part/2                      
binary_part/3                      binary_to_atom/2                   
binary_to_existing_atom/2          binary_to_float/1                  
binary_to_integer/1                binary_to_integer/2                
binary_to_list/1                   binary_to_list/3                   
binary_to_term/1                   binary_to_term/2                   
bit_size/1                         bitsize/1                          
bitstring_to_list/1                bump_reductions/1                  
byte_size/1                        call_on_load_function/1            
cancel_timer/1                     cancel_timer/2                     
ceil/1                             check_old_code/1                   
check_process_code/2               check_process_code/3               
convert_time_unit/3                crasher/6                          
crc32/1                            crc32/2                            
crc32_combine/3                    date/0                             
decode_packet/3                    delay_trap/2                       
delete_element/2                   delete_module/1                    
demonitor/1                        demonitor/2                        
disconnect_node/1                  display/1                          
display_nl/0                       display_string/1                   
dist_ctrl_get_data/1               dist_ctrl_get_data_notification/1  
dist_ctrl_input_handler/2          dist_ctrl_put_data/2               
dist_get_stat/1                    dmonitor_node/3                    
dt_append_vm_tag_data/1            dt_get_tag/0                       
dt_get_tag_data/0                  dt_prepend_vm_tag_data/1           
dt_put_tag/1                       dt_restore_tag/1                   
dt_spread_tag/1                    element/2                          
erase/0                            erase/1                            
error/1                            error/2                            
exit/1                             exit/2                             
exit_signal/2                      external_size/1                    
external_size/2                    finish_after_on_load/2             
finish_loading/1                   float/1                            
float_to_binary/1                  float_to_binary/2                  
float_to_list/1                    float_to_list/2                    
floor/1                            format_cpu_topology/1              
fun_info/1                         fun_info/2                         
fun_info_mfa/1                     fun_to_list/1                      
function_exported/3                garbage_collect/0                  
garbage_collect/1                  garbage_collect/2                  
garbage_collect_message_area/0     gather_gc_info_result/1            
get/0                              get/1                              
get_cookie/0                       get_keys/0                         
get_keys/1                         get_module_info/1                  
get_module_info/2                  get_stacktrace/0                   
group_leader/0                     group_leader/2                     
halt/0                             halt/1                             
halt/2                             has_prepared_code_on_load/1        
hd/1                               hibernate/3                        
insert_element/3                   integer_to_binary/1                
integer_to_binary/2                integer_to_list/1                  
integer_to_list/2                  iolist_size/1                      
iolist_to_binary/1                 iolist_to_iovec/1                  
is_alive/0                         is_atom/1                          
is_binary/1                        is_bitstring/1                     
is_boolean/1                       is_builtin/3                       
is_float/1                         is_function/1                      
is_function/2                      is_integer/1                       
is_list/1                          is_map/1                           
is_map_key/2                       is_number/1                        
is_pid/1                           is_port/1                          
is_process_alive/1                 is_record/2                        
is_record/3                        is_reference/1                     
is_tuple/1                         length/1                           
link/1                             list_to_atom/1                     
list_to_binary/1                   list_to_bitstring/1                
list_to_existing_atom/1            list_to_float/1                    
list_to_integer/1                  list_to_integer/2                  
list_to_pid/1                      list_to_port/1                     
list_to_ref/1                      list_to_tuple/1                    
load_module/2                      load_nif/2                         
loaded/0                           localtime/0                        
localtime_to_universaltime/1       localtime_to_universaltime/2       
make_fun/3                         make_ref/0                         
make_tuple/2                       make_tuple/3                       
map_get/2                          map_size/1                         
match_spec_test/3                  max/2                              
md5/1                              md5_final/1                        
md5_init/0                         md5_update/2                       
memory/0                           memory/1                           
min/2                              module_info/0                      
module_info/1                      module_loaded/1                    
monitor/2                          monitor_node/2                     
monitor_node/3                     monotonic_time/0                   
monotonic_time/1                   nif_error/1                        
nif_error/2                        node/0                             
node/1                             nodes/0                            
nodes/1                            now/0                              
open_port/2                        phash/2                            
phash2/1                           phash2/2                           
pid_to_list/1                      port_call/2                        
port_call/3                        port_close/1                       
port_command/2                     port_command/3                     
port_connect/2                     port_control/3                     
port_get_data/1                    port_info/1                        
port_info/2                        port_set_data/2                    
port_to_list/1                     ports/0                            
posixtime_to_universaltime/1       pre_loaded/0                       
prepare_loading/2                  process_display/2                  
process_flag/2                     process_flag/3                     
process_info/1                     process_info/2                     
processes/0                        purge_module/1                     
put/2                              raise/3                            
read_timer/1                       read_timer/2                       
ref_to_list/1                      register/2                         
registered/0                       resume_process/1                   
round/1                            self/0                             
send/2                             send/3                             
send_after/3                       send_after/4                       
send_nosuspend/2                   send_nosuspend/3                   
seq_trace/2                        seq_trace_info/1                   
seq_trace_print/1                  seq_trace_print/2                  
set_cookie/2                       set_cpu_topology/1                 
setelement/3                       setnode/2                          
setnode/3                          size/1                             
spawn/1                            spawn/2                            
spawn/3                            spawn/4                            
spawn_link/1                       spawn_link/2                       
spawn_link/3                       spawn_link/4                       
spawn_monitor/1                    spawn_monitor/3                    
spawn_opt/1                        spawn_opt/2                        
spawn_opt/3                        spawn_opt/4                        
spawn_opt/5                        split_binary/2                     
start_timer/3                      start_timer/4                      
statistics/1                       subtract/2                         
suspend_process/1                  suspend_process/2                  
system_flag/2                      system_info/1                      
system_monitor/0                   system_monitor/1                   
system_monitor/2                   system_profile/0                   
system_profile/2                   system_time/0                      
system_time/1                      term_to_binary/1                   
term_to_binary/2                   throw/1                            
time/0                             time_offset/0                      
time_offset/1                      timestamp/0                        
tl/1                               trace/3                            
trace_delivered/1                  trace_info/2                       
trace_pattern/2                    trace_pattern/3                    
trunc/1                            tuple_size/1                       
tuple_to_list/1                    unique_integer/0                   
unique_integer/1                   universaltime/0                    
universaltime_to_localtime/1       universaltime_to_posixtime/1       
unlink/1                           unregister/1                       
whereis/1                          yield/0


application                          application_controller               
application_master                   atomics                              
beam_lib                             binary                               
c                                    code                                 
code_server                          counters                             
dict                                 edlin                                
edlin_expand                         epp                                  
erl_abstract_code                    erl_anno                             
erl_distribution                     erl_eval                             
erl_lint                             erl_parse                            
erl_prim_loader                      erl_scan                             
erl_signal_handler                   erl_tracer                           
erlang                               error_handler                        
error_logger                         erts_code_purger                     
erts_dirty_process_signal_handler    erts_internal                        
erts_literal_area_collector          ets                                  
file                                 file_io_server                       
file_server                          filename                             
gb_sets                              gb_trees                             
gen                                  gen_event                            
gen_server                           global                               
global_group                         group                                
group_history                        heart                                
hipe_unified_loader                  inet                                 
inet_config                          inet_db                              
inet_gethost_native                  inet_parse                           
inet_udp                             init                                 
io                                   io_lib                               
io_lib_format                        io_lib_pretty                        
kernel                               kernel_config                        
kernel_refc                          lists                                
logger                               logger_backend                       
logger_config                        logger_filters                       
logger_formatter                     logger_h_common                      
logger_handler_watcher               logger_server                        
logger_simple_h                      logger_std_h                         
logger_sup                           maps                                 
net_kernel                           orddict                              
ordsets                              os                                   
otp_ring0                            persistent_term                      
prim_buffer                          prim_eval                            
prim_file                            prim_inet                            
prim_zip                             proc_lib                             
proplists                            queue                                
ram_file                             raw_file_io                          
raw_file_io_raw                      rpc                                  
sets                                 shell                                
standard_error                       string                               
supervisor                           supervisor_bridge                    
timer                                unicode                              
unicode_util                         user_drv                             
user_sup                             zlib

lists:
all/2          any/2          append/1       append/2       concat/1       
delete/2      droplast/1     dropwhile/2    duplicate/2    filter/2       
filtermap/2   flatlength/1   flatmap/2      flatten/1      flatten/2      
foldl/3        foldr/3        foreach/2      join/2         keydelete/3    
keyfind/3      keymap/3       keymember/3    keymerge/3     keyreplace/4   
keysearch/3    keysort/2      keystore/4     keytake/3      last/1         
map/2          mapfoldl/3     mapfoldr/3     max/1          member/2       
merge/1        merge/2        merge/3        merge3/3       min/1          
module_info/0  module_info/1  nth/2          nthtail/2      partition/2    
prefix/2       reverse/1      reverse/2      rkeymerge/3    rmerge/2       
rmerge/3       rmerge3/3      rukeymerge/3   rumerge/2      rumerge/3      
rumerge3/3     search/2       seq/2          seq/3          sort/1         
sort/2         split/2        splitwith/2    sublist/2      sublist/3      
subtract/2     suffix/2       sum/1          takewhile/2    ukeymerge/3    
ukeysort/2     umerge/1       umerge/2       umerge/3       umerge3/3      
unzip/1        unzip3/1       usort/1        usort/2        zf/2           
zip/2          zip3/3         zipwith/3      zipwith3/4     

string: 
casefold/1         centre/2           centre/3           chars/2            
chars/3            chomp/1            chr/2              concat/2           
copies/2           cspan/2            equal/2            equal/3            
equal/4            find/2             find/3             is_empty/1         
join/2             left/2             left/3             len/1              
length/1           lexemes/2          list_to_float/1    list_to_integer/1  
lowercase/1        module_info/0      module_info/1      next_codepoint/1   
next_grapheme/1    nth_lexeme/3       pad/2              pad/3              
pad/4              prefix/2           rchr/2             replace/3          
replace/4          reverse/1          right/2            right/3            
rstr/2             slice/2            slice/3            span/2             
split/2            split/3            str/2              strip/1            
strip/2            strip/3            sub_string/2       sub_string/3       
sub_word/2         sub_word/3         substr/2           substr/3           
take/2             take/3             take/4             titlecase/1        
to_float/1         to_graphemes/1     to_integer/1       to_lower/1         
to_upper/1         tokens/2           trim/1             trim/2             
trim/3             uppercase/1        words/1            words/2            

file:
advise/4                  allocate/3                altname/1                 
change_group/2            change_mode/2             change_owner/2            
change_owner/3            change_time/2             change_time/3             
close/1                   consult/1                 copy/2                    
copy/3                    copy_opened/3             datasync/1                
del_dir/1                 delete/1                  eval/1                    
eval/2                    format_error/1            get_cwd/0                 
get_cwd/1                 ipread_s32bu_p32bu/3      ipread_s32bu_p32bu_int/3  
list_dir/1                list_dir_all/1            make_dir/1                
make_link/2               make_symlink/2            module_info/0             
module_info/1             native_name_encoding/0    open/2                    
path_consult/2            path_eval/2               path_eval/3               
path_open/3               path_script/2             path_script/3             
pid2name/1                position/2                pread/2                   
pread/3                   pwrite/2                  pwrite/3                  
raw_read_file_info/1      raw_write_file_info/2     read/2                    
read_file/1               read_file_info/1          read_file_info/2          
read_line/1               read_link/1               read_link_all/1           
read_link_info/1          read_link_info/2          rename/2                  
script/1                  script/2                  sendfile/2                
sendfile/5                set_cwd/1                 sync/1                    
truncate/1                write/2                   write_file/2              
write_file/3              write_file_info/2         write_file_info/3         


sets:
add_element/2   del_element/2   filter/2        fold/3          
from_list/1     intersection/1  intersection/2  is_disjoint/2   
is_element/2    is_empty/1      is_set/1        is_subset/2     
module_info/0   module_info/1   new/0           size/1          
subtract/2      to_list/1       union/1         union/2

maps:
filter/2       find/2         fold/3         from_list/1    get/2          
get/3          is_key/2       iterator/1     keys/1         map/2          
merge/2        module_info/0  module_info/1  new/0          next/1         
put/3          remove/2       size/1         take/2         to_list/1      
update/3       update_with/3  update_with/4  values/1       with/2

binary:
at/2                     bin_to_list/1            bin_to_list/2            
bin_to_list/3            compile_pattern/1        copy/1                   
copy/2                   decode_unsigned/1        decode_unsigned/2        
encode_unsigned/1        encode_unsigned/2        first/1                  
last/1                   list_to_bin/1            longest_common_prefix/1  
longest_common_suffix/1  match/2                  match/3                  
matches/2                matches/3                module_info/0            
module_info/1            part/2                   part/3                   
referenced_byte_size/1   replace/3                replace/4                
split/2                  split/3                  

ordsets:
add_element/2   del_element/2   filter/2        fold/3          
from_list/1     intersection/1  intersection/2  is_disjoint/2   
is_element/2    is_empty/1      is_set/1        is_subset/2     
module_info/0   module_info/1   new/0           size/1          
subtract/2      to_list/1       union/1         union/2  

orddict:
append/3          append_list/3     erase/2           fetch/2           
fetch_keys/1      filter/2          find/2            fold/3            
from_list/1       is_empty/1        is_key/2          map/2             
merge/3           module_info/0     module_info/1     new/0             
size/1            store/3           take/2            to_list/1         
update/3          update/4          update_counter/3  

os:  
cmd/1              cmd/2              find_executable/1  find_executable/2  
get_env_var/1      getenv/0           getenv/1           getenv/2           
getpid/0           list_env_vars/0    module_info/0      module_info/1      
perf_counter/0     perf_counter/1     putenv/2           set_env_var/2      
set_signal/2       system_time/0      system_time/1      timestamp/0        
type/0             unset_env_var/1    unsetenv/1         version/0      

 io: 
columns/0          columns/1          format/1           format/2           
format/3           fread/2            fread/3            fwrite/1           
fwrite/2           fwrite/3           get_chars/2        get_chars/3        
get_line/1         get_line/2         get_password/0     get_password/1     
getopts/0          getopts/1          module_info/0      module_info/1      
nl/0               nl/1               parse_erl_exprs/1  parse_erl_exprs/2  
parse_erl_exprs/3  parse_erl_exprs/4  parse_erl_form/1   parse_erl_form/2   
parse_erl_form/3   parse_erl_form/4   printable_range/0  put_chars/1        
put_chars/2        read/1             read/2             read/3             
read/4             request/1          request/2          requests/1         
requests/2         rows/0             rows/1             scan_erl_exprs/1   
scan_erl_exprs/2   scan_erl_exprs/3   scan_erl_exprs/4   scan_erl_form/1    
scan_erl_form/2    scan_erl_form/3    scan_erl_form/4    setopts/1          
setopts/2          write/1            write/2      

## Concurrent 

   Pid = spawn(F)
   Pid ! Msg

   receive
	Msg1 [when Guard1] ->
                Expr_seq1;
	Msg2 [when Guard2] ->
		Expr_seq2;
		...
	MsgN [when GuardN] ->
		Expr_seqN;
			...
	[; after TimeOutTime ->
		Timeout_Expr_seq]
    end

### register

    register(Name, Pid)

### err

    Val = (catch Expr)% {’EXIT’, _}
    (catch F) % {’EXIT’,P}.
    throw(Q)
    exit(P)

```erlang
    Y = (catch 1/0).
    
    sqrt(X) when X < 0 ->
    	    exit({sqrt,X});
    sqrt(X) ->
        ...


    h(cat) -> exit(dog);
    h(N)-> 10*N.

    g(X) ->
       case (catch h(X)) of
          {’EXIT’, _} -> 10;
          Val ->  Val
       end.
```


### Process links

    in process A
    B = spawn_link(fun() -> ... end), % {’EXIT’,Why} -> {’EXIT’,P,Why}
## ERROR HANDLING
    Ref = erlang:monitor(process, B) % {’DOWN’, Ref, process, B, Why} -> A
    	

```erlang

start() -> spawn(fun go/0).
go() ->
     process_flag(trap_exit, true),
     loop().
     
loop() ->
       receive
		{’EXIT’,P,Why} -> % kill
		... handle the error ...
end


```
# Distributed

## PORTS
   spawn(Fun,Node)
   monitor(Node)
   P ! {Con, Command}
   {Port,{data,D}}

Command
   {command,Data}   %
   close	    % {P,closed}
   {connect,Pid1}   % {Port,connected}

## DYNAMIC CODE CHANGE
   tail-calls -> no old code to return -> all old code for a module can safely be deleted.
   
   ```erlang
	-module(m).  %% 1.load/reload m
	...
	loop(Data, F) ->
	receive
		{From, Q} ->
		{Reply, Data1} = F(Q, Data),
		m:loop(data1, F)  %% 2.loop m
	end.
   ```



```erlang
	-module(m).  %% load/reload m
	...
	loop(Data, F) ->
	receive
		{From, Q} ->
			{Reply, Data1} = F(Q, Data),
			loop(data1, F)
	end.


```
# A type notation

+type file:open(fileName(), read | write) ->
      {ok, fileHandle()}
      | {error, string()}.
+type file:read_line(fileHandle()) ->
      {ok, string()}
      | eof.
+type file:close(fileHandle()) ->
      true.
+deftype fileName() = [int()]
+deftype string() = [int()].
+deftype fileHandle() = pid().


int()— is the integer type.
atom() — is the atom type.
pid() — is the Pid type.
ref() — is the reference type.
float() — is the Erlang float type.
port() — is the port type.
bin() — is the binary type.


List, tuple and alternation types are defined recursively:

{X1,X2,...,Xn}  {T1,T2,...,Tn}
[X1,X2,...,Xn]  [T]
T1|T2


+deftype name1() = name2() = ... = Type.
+deftype bool()= true | false.
+deftype weekday() = monday|tuesday|wednesday|thursday|friday.
+deftype weekend() = saturday() | sunday().
+deftype day()= weekday() | weekend().

+type fn(T1, T2, ..., Tn) -> T.

+deftype string() = [int()].
+deftype day()= number() = int().
+deftype town()= street() = string().
+type factorial(int()) -> int().
+type day2int(day())-> int().
+type address(person()) -> {town(), street(), number()}.

+type fun(T1, T2, ..., Tn) -> T end
+type map(fun(X) -> Y end, [X]) -> [Y].





#  PROGRAMMING TECHNIQUES

server --reply--> clients
server <-query-- clients


{State1, Reply} = F(Query, State)


```erlang

-module(server1).
-export([start/3, stop/1, rpc/2]).

start(Name, F, State) ->
	    register(Name, spawn(fun() -> loop(Name, F, State) end)).
stop(Name) ->Name ! stop.

rpc(Name, Query) ->
	  Name ! {self(), Query},  %c->s
	  receive
	  	  {Name, Reply} -> Reply
	  end.

loop(Name, F, State) ->
	   receive
		 stop -> void;
	   {Pid, Query} ->    % s->s
	   	   {Reply, State1} = F(Query, State),
		   Pid ! {Name, Reply},
		   loop(Name, F, State1)   %% tail 
end.


```

 vshlr1:start().
 vshlr1:find("joe").
 vshlr1:i_am_at("joe", "sics").
 vshlr1:find("joe").

```erlang
-module(vshlr1).
-export([start/0, stop/0, handle_event/2,i_am_at/2, find/1]).

-import(server1, [start/3, stop/1, rpc/2]).
-import(dict,[new/0, store/3, find/2]).

start() -> start(vshlr, fun handle_event/2, new()).
stop() -> stop(vshlr).

i_am_at(Who, Where) ->rpc(vshlr, {i_am_at, Who, Where}).

find(Who) ->rpc(vshlr, {find, Who}).

handle_event({i_am_at, Who, Where}, Dict) -> {ok, store(Who, Where, Dict)};

handle_event({find, Who}, Dict) -> {find(Who, Dict), Dict}.


```
A simple server with error recovery.

```erlang

-module(server2).
-export([start/3, stop/1, rpc/2]).
start(Name, F, State) ->
register(Name, spawn(fun() -> loop(Name,F,State) end)).
stop(Name) -> Name ! stop.
rpc(Name, Query) ->Name ! {self(), Query},

receive
	{Name, crash} -> exit(rpc);
	{Name, ok, Reply} -> Reply
end.

loop(Name, F, State) ->
	   receive
	   	   stop -> void;
		   {From, Query} ->
		   	  case (catch F(Query, State)) of
			       {’EXIT’, Why} ->
			       		  log_error(Name, Query, Why),
			       		  From ! {Name, crash},
					  loop(Name, F, State);
			       {Reply, State1} ->
			       	          From ! {Name, ok, Reply},
					  loop(Name, F, State1)
			  end
	 end.
log_error(Name, Query, Why) ->io:format("Server ~p query ~p caused exception ~p~n",[Name, Query, Why]).





```
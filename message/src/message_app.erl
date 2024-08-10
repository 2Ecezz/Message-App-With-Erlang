-module(message_app).
-behaviour(application).

-export([start/0, start/2, stop/0, stop/1]).

start() ->
    start(normal, []).

start(_StartType, _StartArgs) ->
    Dispatch = cowboy_router:compile([
        {'_', [], [
            {"/websocket", message_websocket_handler, []}
        ]}
    ]),

    {ok, _} = cowboy:start_clear(my_http_listener, [{port, 5500}], #{env => #{dispatch => Dispatch}}),

    {ok, []}.

stop() ->
    ok.

stop(_StartType) ->
    ok.

-module(message_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    WebSocketHandler = {message_websocket_handler,
                        {message_websocket_handler, start_link, []},
                        permanent,
                        5000,
                        worker,
                        [message_websocket_handler]},
    {ok, {one_for_one, [WebSocketHandler]}}.

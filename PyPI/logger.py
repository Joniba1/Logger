import os
import json
import asyncio
import time
from collections import OrderedDict

class StorageFullError(Exception):
    pass

class Logger:
    def __init__(self):
        self.log_path = ''
        self.is_running = False
        self.is_logging = False
        self.log_queue = []
        self.start_time = None

    def get_elapsed_time(self):
        if self.start_time is None:
            return 0
        return int(time.time() - self.start_time)

    async def log_async(self, data):
        self.log_queue.append(data)
        if not self.is_logging:
            self.is_logging = True
            while self.log_queue:
                log_item = self.log_queue.pop(0)
                log_item['timestamp'] = self.get_elapsed_time()
    
                ordered_log_item = OrderedDict([('timestamp', log_item['timestamp'])] + 
                                   [(k, v) for k, v in log_item.items() if k != 'timestamp'])
    
                try:
                    with open(self.log_path, 'a') as file:
                        file.write(json.dumps(ordered_log_item) + '\n')
                except Exception as e:
                    self.is_logging = False
                    raise StorageFullError(f"Error while logging: {e}")
            self.is_logging = False

    def log(self, data):
        asyncio.run(self.log_async(data))

    @staticmethod
    def is_json(obj):
        try:
            json.dumps(obj)
            return True
        except Exception:
            return False

    async def logging_async(self):
        while self.is_logging:
            await asyncio.sleep(0.05)

    def logging(self):
        asyncio.run(self.logging_async())

    async def terminate_async(self):
        await self.logging_async()

        if not self.is_running:
            print('Logger is not running.')
            return

        self.is_running = False

        data = {
            'message': 'terminated'
        }

        await self.log_async(data)

    def terminate(self):
        asyncio.run(self.terminate_async())

    async def start_async(self, log_file_name):
        await self.logging_async()

        if self.is_running:
            print('Terminate the logger before starting a new one')
            return
        elif not log_file_name:
            print('File name is missing')
            return
        
        log_dir = 'logs'
        os.makedirs(log_dir, exist_ok=True) 

        self.log_path = os.path.join(log_dir, f'{log_file_name}.jsonl')

        if os.path.exists(self.log_path):
            print('File name already exists')
            return

        self.start_time = time.time()

        data = {
            'message': 'take-off',
        }

        await self.log_async(data)
        self.is_running = True

    def start(self, log_file_name):
        asyncio.run(self.start_async(log_file_name))

    async def initiate_service_async(self, service):
        await self.logging_async()

        if not self.is_running:
            print('You must initialize a logger')
            return
        elif not service:
            print('Service name is missing')
            return

        data = {
            'message': 'initiated-service',
            'service': service,
        }

        await self.log_async(data)

    def initiate_service(self, service):
        asyncio.run(self.initiate_service_async(service))

    async def terminate_service_async(self, service):
        await self.logging_async()

        if not self.is_running:
            print('You must initialize the logger')
            return
        elif not service:
            print('Service name is missing')
            return

        data = {
            'message': 'terminated-service',
            'service': service,
        }

        await self.log_async(data)

    def terminate_service(self, service):
        asyncio.run(self.terminate_service_async(service))

    async def event_async(self, service, x1, y1, x2, y2):
        await self.logging_async()

        if not self.is_running:
            print('You must initialize the logger')
            return
        elif not service or x1 is None or y1 is None or x2 is None or y2 is None:
            print('1 or more arguments are missing')
            return

        data = {
            'message': 'event',
            'service': service,
            'bbox_x1': x1, 
            'bbox_x2': x2,
            'bbox_y1': y1, 
            'bbox_y2': y2, 
 
        }

        await self.log_async(data)

    def event(self, service, x1, y1, x2, y2):
        asyncio.run(self.event_async(service, x1, y1, x2, y2))

    async def error_async(self, service, err):
        await self.logging_async()

        if not self.is_running:
            print('You must initialize the logger')
            return
        elif not service or not err:
            print('1 or more arguments are missing')
            return

        data = {
            'message': 'error',
            'service': service,
            'error': err,
        }

        await self.log_async(data)

    def error(self, service, err):
        asyncio.run(self.error_async(service, err))

